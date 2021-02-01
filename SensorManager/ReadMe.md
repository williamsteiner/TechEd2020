Ver. 1.0.0

Changed manifest uri for json data in order to deploy and test

from "olduri": "./localService/sensors.json",
to "uri": "https://cors-anywhere.herokuapp.com/https://docrepo.oldworldind.net/sensors.json"

-- json data on owi server
https://docrepo.oldworldind.net/sensors.json

-- build
 right click on mta.yaml file

-- deploy
change target at bottom footer - left side to correct target env 
 right click on mta_archives mtar file

-- change mta.yaml version

-- change xs-app.jon to route to new page vs index.html
 "welcomeFile": "keepcoolSensorManager",


 -- b2c_test deployed app url
 https://b2ctest-dev-teched2020-approuter.cfapps.us10.hana.ondemand.com/keepcoolSensorManager/index.html

 -- questions

 1) how do i change run-time target env?
ans: can not change local since only 1 license of studio for IDE dev on b2b dev site

-- tesing

test new page  

https://b2btest-workspaces-ws-6t5vz-app1.us10.applicationstudio.cloud.sap/keepcoolSensorManager/index.html#sensor/0


---------------------- github notes -------------------------------
repo: https://github.com/williamsteiner/TechEd2020.git
text me for the credentials. name: williamsteiner

-- studio push and tag

git add -A
git commit -m "exercise 8"
git push
git tag exercise_8.0
git push origin --tags


=========================================================================
 Further Information
Routing in UI5: https://ui5.sap.com/#/topic/902313063d6f45aeaa3388cc4c13c34e)

session url: https://github.com/SAP-samples/teched2020-DEV164
