---
layout: post
title: "Java 7 Portable for OSX"
description: ""
category: java
tagline: "(even snow leopard)"
tags : [java, osx]
headerimage: "http://fr.cdn.v5.futura-sciences.com/builds/images/thumbs/2/21b967d6d8_29240_station%20spatiale%201883_NASA%20Ames%20Research%20Center.jpg"
summary: "Being frustrated with the limitations of the native oracle java installer, I wanted to pull out the JDK and JRE to its own folder, creating a portable java runtime and developer kit"
headline: "Get Java 7 working on snow leopard now"
theme :
  name : dwtalk
---
{% include JB/setup %}
Being a long time Windows and Linux user and also a Java Developer, one thing I have become accustomed to is a portable jdk contained all within one folder.
Much like newer versions of Ubuntu, OSX has tried to ease your life by making the JDK an integral part of the operating system with custom directories, paths, and apps to change the system version of the JRE. I have found all of these utilities to be hacks that never fully work right or allow for multiple simultaneous versions of java. I also recently found out that Java 7 was limited to Lion only, and not available out of the box for Snow Leopard. This "fixes" these oversights by extracting the JDK from the native installer from Oracle, so it can be used how I want it to be used.

## Here's the process:
Download the Java SE Development Kit 7 update 17 for MacOSX from the Oracle Website. The file should be `jdk-7u17-macosx-x64.dmg`.

Mount the dmg file using finder or via the command line:

	$ hdiutil mount jdk-7u17-macosx-x64.dmg

Copy the file "JDK 7 Update 17.pkg" from the mount to a known location such as the Desktop.

We can now extract the package file to a folder using the following command:

	$ pkgutil --expand JDK\ 7\ Update\ 17.pkg jdk

This will present us with all of the installation files for the JDK. We need to get to the JDK files though, so a few more steps.

Open up the jdk folder in finder and right click on the `jdk17017.pkg` file and select "Show Package Contents".
You will see several files, but you will only need to copy the `Payload` file to a known location such as the desktop.

<div class="row text-center">
	<img src="{{ ASSET_PATH }}/img/r.png" class="" alt="jdk17017.pkg" />
</div>

Navigate to that location and run the following commands:

	$ cat Payload | gunzip -dc | cpio -i
	$ mv Contents/Home jdk1.7.0_17

You should now have a portable jdk for Java 7 update 17 in the folder `jdk1.7.0_17` which can be used on any OSX version from Snow Leopard to Mountain Lion.

Don't forget to set you `JAVA_HOME` and `JDK_HOME` environmental variables in your bash profile or in the `/etc/launchd.conf` files.




