#!/usr/bin/env node

/**
 * NoticeMe Deployment Checklist
 * Run this to verify everything is ready for deployment
 */

const fs = require('fs');
const path = require('path');

console.log('\n🚀 NoticeMe Vercel Deployment Checklist\n');
console.log('═'.repeat(50));

const checks = [
  {
    name: 'HTML file exists',
    test: () => fs.existsSync('index.html'),
    file: 'index.html'
  },
  {
    name: 'CSS file exists',
    test: () => fs.existsSync('style.css'),
    file: 'style.css'
  },
  {
    name: 'Express server exists',
    test: () => fs.existsSync('server.js'),
    file: 'server.js'
  },
  {
    name: 'Vercel config exists',
    test: () => fs.existsSync('vercel.json'),
    file: 'vercel.json'
  },
  {
    name: 'API function exists',
    test: () => fs.existsSync('api/waitlist.js'),
    file: 'api/waitlist.js'
  },
  {
    name: 'Package.json exists',
    test: () => fs.existsSync('package.json'),
    file: 'package.json'
  },
  {
    name: 'Has "Other" option in form',
    test: () => {
      const content = fs.readFileSync('index.html', 'utf8');
      return content.includes('value="other"');
    },
    file: 'index.html'
  },
  {
    name: 'Form submits to /api/waitlist',
    test: () => {
      const content = fs.readFileSync('index.html', 'utf8');
      return content.includes("fetch('/api/waitlist'");
    },
    file: 'index.html'
  },
  {
    name: 'CORS headers configured in API',
    test: () => {
      const content = fs.readFileSync('api/waitlist.js', 'utf8');
      return content.includes('Access-Control-Allow-Origin');
    },
    file: 'api/waitlist.js'
  },
  {
    name: '.vercelignore exists',
    test: () => fs.existsSync('.vercelignore'),
    file: '.vercelignore'
  },
  {
    name: '.gitignore exists',
    test: () => fs.existsSync('.gitignore'),
    file: '.gitignore'
  },
  {
    name: 'Deployment guide exists',
    test: () => fs.existsSync('VERCEL_DEPLOYMENT.md'),
    file: 'VERCEL_DEPLOYMENT.md'
  }
];

let passCount = 0;
let failCount = 0;

checks.forEach((check, index) => {
  const passed = check.test();
  const status = passed ? '✅' : '❌';
  const file = check.file ? ` (${check.file})` : '';
  
  console.log(`${status} ${check.name}${file}`);
  
  if (passed) passCount++;
  else failCount++;
});

console.log('═'.repeat(50));
console.log(`\nResults: ${passCount}/${checks.length} checks passed\n`);

if (failCount > 0) {
  console.log(`❌ ${failCount} check(s) failed. Fix before deploying.\n`);
  process.exit(1);
} else {
  console.log('✅ All checks passed! Ready to deploy to Vercel!\n');
  console.log('Next steps:');
  console.log('  1. git add .');
  console.log('  2. git commit -m "Ready for Vercel"');
  console.log('  3. git push origin main');
  console.log('  4. Go to https://vercel.com/dashboard');
  console.log('  5. Import your GitHub repo\n');
  process.exit(0);
}
