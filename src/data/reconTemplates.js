// Risk levels
export const RISK = { CRITICAL: 'critical', HIGH: 'high', MEDIUM: 'medium' };

export const RECON_CATEGORIES = [
  {
    id: 'credentials',
    label: 'Credentials & Secrets',
    templates: [
      { risk: RISK.CRITICAL, label: 'Passwords in exposed files',     dork: 'site:{domain} intext:password filetype:txt OR filetype:log OR filetype:env' },
      { risk: RISK.CRITICAL, label: '.env files with DB credentials',  dork: 'site:{domain} inurl:.env intext:DB_PASSWORD' },
      { risk: RISK.CRITICAL, label: 'Private keys exposed',           dork: 'site:{domain} intext:"BEGIN RSA PRIVATE KEY" OR intext:"BEGIN OPENSSH PRIVATE KEY"' },
      { risk: RISK.CRITICAL, label: 'AWS access keys',                dork: 'site:{domain} intext:"AKIA" filetype:txt OR filetype:env OR filetype:cfg' },
      { risk: RISK.CRITICAL, label: 'API keys / tokens',              dork: 'site:{domain} intext:"api_key" OR intext:"api_token" OR intext:"secret_key"' },
      { risk: RISK.HIGH,     label: 'SQL dumps with credentials',     dork: 'site:{domain} filetype:sql intext:INSERT INTO intext:password' },
      { risk: RISK.HIGH,     label: 'Config files with passwords',    dork: 'site:{domain} filetype:cfg OR filetype:conf OR filetype:ini intext:password' },
      { risk: RISK.HIGH,     label: 'XML files with credentials',     dork: 'site:{domain} filetype:xml intext:password OR intext:username' },
      { risk: RISK.MEDIUM,   label: 'Email addresses exposed',        dork: 'site:{domain} intext:"@{domain}" filetype:txt OR filetype:csv' },
    ],
  },
  {
    id: 'admin-access',
    label: 'Admin & Login Panels',
    templates: [
      { risk: RISK.HIGH,     label: 'Admin login pages',              dork: 'site:{domain} inurl:admin intitle:login OR intitle:"admin panel"' },
      { risk: RISK.HIGH,     label: 'Dashboard interfaces',           dork: 'site:{domain} inurl:dashboard OR inurl:controlpanel intitle:login' },
      { risk: RISK.HIGH,     label: 'phpMyAdmin instances',           dork: 'site:{domain} inurl:phpmyadmin' },
      { risk: RISK.HIGH,     label: 'cPanel / WHM access',            dork: 'site:{domain} inurl:2082 OR inurl:2083 OR inurl:2086 OR inurl:2087' },
      { risk: RISK.HIGH,     label: 'WordPress admin',                dork: 'site:{domain} inurl:wp-admin OR inurl:wp-login.php' },
      { risk: RISK.MEDIUM,   label: 'Staging / dev login pages',      dork: 'site:{domain} inurl:staging OR inurl:dev OR inurl:test intitle:login' },
      { risk: RISK.MEDIUM,   label: 'API management portals',         dork: 'site:{domain} inurl:api intitle:login OR intitle:"API Console"' },
      { risk: RISK.MEDIUM,   label: 'Remote access portals',          dork: 'site:{domain} intitle:"Remote Desktop" OR intitle:"VPN Login" OR intitle:"Citrix Gateway"' },
    ],
  },
  {
    id: 'exposed-files',
    label: 'Exposed Files & Directories',
    templates: [
      { risk: RISK.CRITICAL, label: 'Open directory listings',        dork: 'site:{domain} intitle:"index of /" intext:"parent directory"' },
      { risk: RISK.CRITICAL, label: 'Exposed .git directory',         dork: 'site:{domain} inurl:"/.git" intitle:"index of"' },
      { risk: RISK.CRITICAL, label: 'wp-config.php exposed',          dork: 'site:{domain} inurl:wp-config.php' },
      { risk: RISK.HIGH,     label: 'Backup files',                   dork: 'site:{domain} filetype:bak OR filetype:backup OR filetype:old OR filetype:orig' },
      { risk: RISK.HIGH,     label: 'Log files',                      dork: 'site:{domain} filetype:log intext:error OR intext:warning' },
      { risk: RISK.HIGH,     label: 'Database files',                 dork: 'site:{domain} filetype:sql OR filetype:db OR filetype:sqlite' },
      { risk: RISK.HIGH,     label: 'Excel / CSV data exports',       dork: 'site:{domain} filetype:xls OR filetype:xlsx OR filetype:csv' },
      { risk: RISK.MEDIUM,   label: 'PDF documents',                  dork: 'site:{domain} filetype:pdf' },
      { risk: RISK.MEDIUM,   label: 'Word / Office documents',        dork: 'site:{domain} filetype:doc OR filetype:docx OR filetype:pptx' },
      { risk: RISK.MEDIUM,   label: 'Confidential / internal docs',   dork: 'site:{domain} intext:confidential OR intext:"internal use only" OR intext:"do not distribute"' },
    ],
  },
  {
    id: 'cloud-infra',
    label: 'Cloud & Infrastructure',
    templates: [
      { risk: RISK.CRITICAL, label: 'S3 bucket exposure',             dork: 'site:s3.amazonaws.com "{domain}"' },
      { risk: RISK.CRITICAL, label: 'Firebase database exposed',      dork: 'site:firebaseio.com "{domain}"' },
      { risk: RISK.HIGH,     label: 'Azure blob storage',             dork: 'site:blob.core.windows.net "{domain}"' },
      { risk: RISK.HIGH,     label: 'GCP storage buckets',            dork: 'site:storage.googleapis.com "{domain}"' },
      { risk: RISK.HIGH,     label: 'Exposed Docker registries',      dork: 'site:{domain} inurl:"/v2/" intitle:"Docker Registry"' },
      { risk: RISK.HIGH,     label: 'Jenkins CI exposed',             dork: 'site:{domain} intitle:"Dashboard [Jenkins]"' },
      { risk: RISK.HIGH,     label: 'Kubernetes dashboard',           dork: 'site:{domain} intitle:"Kubernetes Dashboard"' },
      { risk: RISK.MEDIUM,   label: 'Grafana / monitoring panels',    dork: 'site:{domain} intitle:"Grafana" OR intitle:"Kibana" OR intitle:"Prometheus"' },
      { risk: RISK.MEDIUM,   label: 'Exposed Swagger / API docs',     dork: 'site:{domain} inurl:swagger OR inurl:api-docs intitle:"Swagger UI"' },
    ],
  },
  {
    id: 'vulnerabilities',
    label: 'Vulnerability Indicators',
    templates: [
      { risk: RISK.CRITICAL, label: 'SQL error messages',             dork: 'site:{domain} intext:"sql syntax near" OR intext:"mysql_fetch_array()" OR intext:"ORA-01756"' },
      { risk: RISK.CRITICAL, label: 'PHP fatal errors exposed',       dork: 'site:{domain} intext:"Fatal error:" OR intext:"Warning: include" OR intext:"Warning: require"' },
      { risk: RISK.HIGH,     label: 'Stack traces in production',     dork: 'site:{domain} intext:"at java.lang" intext:"Exception" OR intext:"Traceback (most recent"' },
      { risk: RISK.HIGH,     label: 'Debug / test pages live',        dork: 'site:{domain} inurl:debug OR inurl:test OR inurl:phpinfo intitle:phpinfo' },
      { risk: RISK.HIGH,     label: 'Open redirect parameters',       dork: 'site:{domain} inurl:"redirect=" OR inurl:"next=" OR inurl:"return=" OR inurl:"url="' },
      { risk: RISK.MEDIUM,   label: 'Error pages leaking paths',      dork: 'site:{domain} intitle:"404" OR intitle:"500" intext:"/"' },
      { risk: RISK.MEDIUM,   label: 'Exposed server info',            dork: 'site:{domain} intitle:"Apache Status" OR intitle:"nginx status" OR intitle:"IIS Windows"' },
    ],
  },
  {
    id: 'tech-stack',
    label: 'Tech Stack Fingerprinting',
    templates: [
      { risk: RISK.MEDIUM,   label: 'WordPress detection',            dork: 'site:{domain} inurl:wp-content OR inurl:wp-includes' },
      { risk: RISK.MEDIUM,   label: 'Drupal detection',               dork: 'site:{domain} inurl:"/sites/default/" OR intext:"Powered by Drupal"' },
      { risk: RISK.MEDIUM,   label: 'Joomla detection',               dork: 'site:{domain} inurl:"/components/com_" OR intext:"Joomla!"' },
      { risk: RISK.MEDIUM,   label: 'Laravel / PHP framework',        dork: 'site:{domain} intext:"Laravel" OR inurl:"/storage/logs" OR intext:"APP_KEY"' },
      { risk: RISK.MEDIUM,   label: 'Django / Python backend',        dork: 'site:{domain} intext:"Django" OR intitle:"Django" OR inurl:"/admin/" intext:"Django administration"' },
      { risk: RISK.MEDIUM,   label: 'Ruby on Rails',                  dork: 'site:{domain} intext:"Ruby on Rails" OR inurl:"/rails/" OR intext:"ActionController"' },
      { risk: RISK.MEDIUM,   label: 'ASP.NET / IIS stack',            dork: 'site:{domain} inurl:".aspx" OR inurl:".ashx" OR intext:"ASP.NET"' },
      { risk: RISK.MEDIUM,   label: 'Node.js / Express',              dork: 'site:{domain} intext:"Express" intext:"node_modules" OR inurl:"/api/v" intext:"Cannot GET"' },
      { risk: RISK.MEDIUM,   label: 'Spring Boot (Java)',             dork: 'site:{domain} inurl:"/actuator" OR intext:"Whitelabel Error Page" OR intext:"Spring Boot"' },
      { risk: RISK.MEDIUM,   label: 'Magento (eCommerce)',            dork: 'site:{domain} inurl:"/skin/frontend/" OR intext:"Magento"' },
      { risk: RISK.MEDIUM,   label: 'Shopify stores',                 dork: 'site:{domain} inurl:".myshopify.com" OR intext:"Powered by Shopify"' },
    ],
  },
];

export const RISK_META = {
  critical: { label: 'Critical', color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/30' },
  high:     { label: 'High',     color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  medium:   { label: 'Medium',   color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
};
