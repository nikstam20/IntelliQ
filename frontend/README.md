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
* Set up the webserver. In order to occupy port:80 with XAMPP, you have to perform the following actions:

 1. Go to the file in C:\xampp\apache\conf\extra\httpd-vhosts.conf, open it in an 
 editor and add the following code to the bottom of it:
 
 <pre>    &ltVirtualHost *:80&gt
        ServerName inteliQ.com
        ServerAlias www.inteliQ.com
        ServerAdmin webmaster@inteliQ.com
        DocumentRoot "Path"              <---- replace Path here 
         &ltDirectory Path&gt            <---- replace Path here 
            Options Indexes FollowSymLinks MultiViews
      AllowOverride all
      Order Deny,Allow
            Allow from all
            Require all granted
        &lt/Directory&gt
    &lt/VirtualHost&gt
</pre>

    !!! Replace "Path" with your computer's path to ~/SoftEng22-13/frontend/frontend1/build
![image](https://user-images.githubusercontent.com/115226054/217953370-026873e8-16d0-4190-9c33-53a42cd409ff.png)

  2. Go to C:\Windows\System32\drivers\etc and open the file named 'hosts' in an editor (note: do not 
  confuse it with the file hosts.ics in the same folder). Go to the bottom of it and add:<br>
<pre>    127.0.0.1 www.inteliQ.com </pre>
![image](https://user-images.githubusercontent.com/115226054/217953612-a960806e-238f-41d1-b47d-0c716341659f.png)

### How to run

You can download the build directly from here or build the app yourself by going to ~/SoftEng22-13/frontend/frontend1 and running:
  ```sh
  npm run build
  ```
Once the build is deployed, the webserver will be up at localhost:80 and www.intelliQ.com while the 
program is running. You can then try:
<pre>
www.intelliQ.com/?QuestionnaireID=&ltinsert_id_here&gt or
www.intelliQ.com/Graph?QuestionnaireID=&ltinsert_id_here&gt
</pre>