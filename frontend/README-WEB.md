<!-- FRONT-END -->
## Front-end

Front-end for use-cases "Answer Questionnaire" and "View Questionnaire Response Data with Pie" made with React.

### Prerequisites

* Install React. Run:
  ```sh
  npm install react -g
  ```
* Install all necessary modules defined in package.json. Go to ~/SoftEng22-13/frontend/frontend1 and run:
  ```sh
  npm install
  ```
* Set up the webserver. In order to occupy port:80 with XAMPP, you need to do the following actions:
  1. Go to the file in C:\xampp\apache\conf\extra\httpd-vhosts.conf, open it in an editor and add the following code to the bottom of it:
    <VirtualHost *:80>
        ServerName inteliQ.com
        ServerAlias www.inteliQ.com
        ServerAdmin webmaster@inteliQ.com
        DocumentRoot "Path"              <---- replace Path here
         <Directory Path>               <---- replace Path here
            Options Indexes FollowSymLinks MultiViews
      AllowOverride all
      Order Deny,Allow
            Allow from all
            Require all granted
        </Directory>
    </VirtualHost>
    
    !!! Replace "Path" with your computers path to ~/SoftEng22-13/frontend/frontend1/build 
  2. Go to C:\Windows\System32\drivers\etc and open the file names 'hosts' in an editor (note: do not confuse it with the file hosts.ics in the same file). Go to the bottom of it and add:
    127.0.0.1    www.inteliQ.com 

### How to run

You can download the build directly from here or build the app yourself by going to ~SoftEng22-13/frontend/frontend1 and running:
  ```sh
  npm run build
  ```
Once the build is deployed, the webserver will be up at localhost:80 or www.intelliQ.com while the program is running. You can then try:

www.intelliQ.com/?QuestionnaireID=<insert_id_here> 
www.intelliQ.com/Graph?QuestionnaireID=<insert_id_here>


#Γράφω οδηγίες για web-server (μη τρομαξετε ειναι διαφορα)

1. Πάμε στα frontend και κάνουμε npm install react-router-dom
2. Πάμε στο installation του XAMPP C:\xampp\apache\conf\extra\httpd-vhosts.conf το ανοίγουμε
και στο τέλος γράφουμε (copy-paste):
<VirtualHost *:80>
    ServerName inteliQ.com
    ServerAlias www.inteliQ.com
    ServerAdmin webmaster@inteliQ.com
    DocumentRoot "Path"
     <Directory Path>
        Options Indexes FollowSymLinks MultiViews
  AllowOverride all
  Order Deny,Allow
        Allow from all
        Require all granted
    </Directory>
</VirtualHost>
Στο Path o καθένας βάζει το path για τον δικό του φάκελο για το build του frontend1.
3. Πάμε στο C:\Windows\System32\drivers\etc ανοίγουμε το hosts με το vscode και στο τέλος χωρίς σχόλια βάζουμε 127.0.0.1    www.inteliQ.com (το όνομα μπορουμε να το αλλάξουμε προφανώς και δεν χρειαζεται να εχει www ή .com). Κάνουμε save θα μας πεταξει ενα μήνυμα οτι πρέπει να ειμαστε administrator παταμε retry as administrator.
4. Στον φάκελο public στο frontend1 δημιουργούμε αρχείο .htaccess και μέσα του γράφουμε:
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
5. Στον φάκελο package.json στο frontend1 προσθέτουμε μια γραμμή: "homepage": "http://www.inteliQ.com", κάτω από το version.
6. Κάνουμε RESTART τον XAMPP (μην το ξεχασετε αλλιώς δεν δουλευει τίποτα) και πηγαινουμε στο www.inteliQ.com.
7. Enjoy! :) (because we didn't)
