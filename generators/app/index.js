const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('projectName', { type: String });
    this.option('groupId', { type: String });
    this.option('artifactId', { type: String });
    this.option('packageName', { type: String });
    this.option('database', { type: String });
    this.option('docker', { type: Boolean });
    this.option('gitInit', { type: Boolean });
    this.option('runBuild', { type: Boolean });
  }

  async prompting() {
    const opts = this.options || {};
    const required = ['projectName','groupId','artifactId','packageName','database','docker','gitInit','runBuild'];
    const hasAll = required.every(k => typeof opts[k] !== 'undefined' && opts[k] !== null);
    if (hasAll) {
      this.answers = {
        projectName: opts.projectName,
        groupId: opts.groupId,
        artifactId: opts.artifactId,
        packageName: opts.packageName,
        database: opts.database,
        docker: !!opts.docker,
        gitInit: !!opts.gitInit,
        runBuild: !!opts.runBuild
      };
      return;
    }

    this.answers = await this.prompt([
      { type: 'input', name: 'projectName', message: 'Project name', default: opts.projectName || this.appname.replace(/\s+/g,'-') },
      { type: 'input', name: 'groupId', message: 'Group ID', default: opts.groupId || 'com.mycompany' },
      { type: 'input', name: 'artifactId', message: 'Artifact ID', default: opts.artifactId || 'spring-bootstrap' },
      { type: 'input', name: 'packageName', message: 'Kotlin package name', default: opts.packageName || 'com.mycompany.springbootstrap' },
      { type: 'list', name: 'database', message: 'Database', choices: ['H2','PostgreSQL'], default: opts.database || 'H2' },
      { type: 'confirm', name: 'docker', message: 'Include Docker support?', default: typeof opts.docker === 'boolean' ? opts.docker : true },
      { type: 'confirm', name: 'gitInit', message: 'Initialize git repository?', default: typeof opts.gitInit === 'boolean' ? opts.gitInit : true },
      { type: 'confirm', name: 'runBuild', message: 'Run Gradle build after scaffolding?', default: typeof opts.runBuild === 'boolean' ? opts.runBuild : false }
    ]);
  }

  async writing() {
    const dest = this.destinationPath();
    const repoUrl = 'https://github.com/fialhorenato/spring-bootstrap-template.git';
    const os = require('os');
    const temp = fs.mkdtempSync(path.join(os.tmpdir(),'spring-bootstrap-'));
    let templateSource = null;
    try { await this.spawnCommandSync('git',['clone',repoUrl,temp]); templateSource = temp; } catch(e) { const packaged = this.templatePath('project'); if (fs.existsSync(packaged)) templateSource = packaged; }
    if (!templateSource) { this.log('No template source available'); return; }

    // copy files
    if (fs.cpSync) fs.cpSync(templateSource,dest,{recursive:true,force:true}); else {
      const files = glob.sync(path.join(templateSource,'/**/*'),{dot:true});
      files.forEach(p => { const rel = path.relative(templateSource,p); const tgt = path.join(dest,rel); try { const st = fs.statSync(p); if (st.isDirectory()) fs.mkdirSync(tgt,{recursive:true}); else { fs.mkdirSync(path.dirname(tgt),{recursive:true}); fs.copyFileSync(p,tgt); } } catch(e){} });
    }

    // basic replacements
    const newPkg = this.answers.packageName;
    const origPkgCandidates = ['com.renato.springbootstrap','com.mycompany.springboottemplate','com.mycompany.springbootstrap'];
    let origPkg = null;
    try {
      const appFiles = glob.sync(path.join(dest,'src/main/kotlin/**/SpringBootstrapApplication.kt')); if (appFiles.length) { const c = fs.readFileSync(appFiles[0],'utf8'); const m = c.match(/^package\s+([a-zA-Z0-9_.]+)/m); if (m) origPkg = m[1]; }
    } catch(e){}
    if (!origPkg) { for (const f of origPkgCandidates) { if (fs.existsSync(path.join(dest,'src/main/kotlin',f.split('.').join('/')))) { origPkg = f; break; } } }
    if (!origPkg) origPkg = 'com.mycompany.springbootstrap';

    const files = glob.sync(dest+'/**/*',{nodir:true,dot:true,ignore:['**/.git/**','**/build/**','**/.gradle/**']});
    files.forEach(file => { try { let content = fs.readFileSync(file,'utf8'); content = content.split(origPkg).join(newPkg); content = content.split('spring-bootstrap-template').join(this.answers.artifactId); if (file.endsWith('build.gradle.kts')) content = content.replace(/group\s*=\s*"[^"]+"/,'group = "'+this.answers.groupId+'"'); if (file.endsWith('settings.gradle.kts')) content = content.replace(/rootProject.name\s*=\s*"[^"]+"/,'rootProject.name = "'+this.answers.artifactId+'"'); fs.writeFileSync(file,content,'utf8'); } catch(e){} });

    // Move files to match package declaration
    try {
      ['src/main/kotlin','src/test/kotlin'].forEach(rootRel => {
        const root = path.join(dest,rootRel);
        if (!fs.existsSync(root)) return;
        const all = glob.sync(path.join(root,'/**/*.kt'),{nodir:true,dot:true});
        all.forEach(f => { try { const c = fs.readFileSync(f,'utf8'); const m = c.match(/^package\s+([a-zA-Z0-9_.]+)/m); if (!m) return; const declared = m[1]; const declaredPath = declared.split('.').join(path.sep); const desired = path.join(root,declaredPath); fs.mkdirSync(desired,{recursive:true}); const destFile = path.join(desired,path.basename(f)); if (path.resolve(f) !== path.resolve(destFile)) { try { fs.renameSync(f,destFile); } catch(e) { try { fs.copyFileSync(f,destFile); fs.unlinkSync(f);}catch(_){} } } } catch(e){} });
      });
    } catch(e){}

    // Update generated .gitignore
    try { const gi = path.join(dest,'.gitignore'); let text = fs.existsSync(gi)?fs.readFileSync(gi,'utf8') : ''; const o1 = 'src/main/kotlin/'+origPkg.split('.').join('/') + '/'; const o2 = 'src/test/kotlin/'+origPkg.split('.').join('/') + '/'; if (!text.includes(o1)) text += '\n# Ignore original template package\n'+o1+'\n'; if (!text.includes(o2)) text += o2+'\n'; fs.writeFileSync(gi,text,'utf8'); } catch(e){}

    // Remove .git folder from template copy
    try { fs.rmSync(path.join(dest,'.git'),{recursive:true,force:true}); } catch(e){}

    // Init git if requested
    if (this.answers.gitInit) { try { await this.spawnCommandSync('git',['init'],{cwd:dest}); await this.spawnCommandSync('git',['add','.'],{cwd:dest}); await this.spawnCommandSync('git',['commit','-m','Initial commit from yeoman generator'],{cwd:dest}); } catch(e){} }

    // Run build if requested
    if (this.answers.runBuild) {
      try { const gradlew = path.join(dest,'gradlew'); if (fs.existsSync(gradlew)) { try{ fs.chmodSync(gradlew,0o755);}catch(e){} await this.spawnCommandSync('./gradlew',['clean','build'],{cwd:dest}); } else { await this.spawnCommandSync('gradle',['clean','build'],{cwd:dest}); } } catch(e) { this.log('Gradle build failed', e && e.message ? e.message : e); }
    }

    this.log('Generator finished. Project scaffolded to', dest);
  }
};
