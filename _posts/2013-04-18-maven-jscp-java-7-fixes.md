---
layout: post
title: "Fixing Maven JSPC Issues with Java 7 on OSX"
description: ""
category: java
tagline: "w/ Jenkins"
tags : [java, osx]
headerimage: "http://fr.cdn.v5.futura-sciences.com/builds/images/thumbs/2/21b967d6d8_29240_station%20spatiale%201883_NASA%20Ames%20Research%20Center.jpg"
summary: "Running on the latest technology platform has it's risks and rewards, but Java 7 1.7.0.17 on OSX 10.8.3 has been out for a while now and I would expect the Maven JSPC Plugin 1.4.6 to work correctly as well. I present a simple method for patching the system as well as correcting the code and giving back to open source development."
headline: "Fix JSPC Issues for OSX, cause it gets outdates and has no maintenance"
theme :
  name : dwtalk
---
{% include JB/setup %}
Running on the latest technology platform has it's risks and rewards, but Java 7 on OSX has been out for a while now and I would expect JSPC to work correctly as well. I present a simple method for patching the system as well as correcting the code and giving back to open source development.

###The Error
When compiling an existing application I have on OSX Mountain Lion using `Java 7.0.17` and `Jenkins 1.5.0` on `Maven 3.0.5`, I ran into the following error:

	Exception in thread "main" java.lang.AssertionError: Missing tools.jar at: /Library/Java/JavaVirtualMachines/jdk1.7.0_17.jdk/Contents/Home/Classes/classes.jar. Expression: file.exists()

###The Workaround

With the introduction of Java 7, tools.jar has been separated out of the classes.jar with (located in the lib directory of the jdk) and all classes are now stored in the runtime jar rt.jar located in the jre's lib directory. We can help bypass this shortcoming with the following by creating a symbolic link for the jspc compiler:

	$ cd /Library/Java/JavaVirtualMachines/jdk1.7.0_17.jdk/Contents/Home/
	$ sudo mkdir Classes
	$ sudo ln -s ../jre/lib/rt.jar classes.jar


###The Solution
As an open source user and developed, it's simply not enough to create a work-around, I want to know how to perm fix this issue. Time to dig into the code.
Looking through the plugin code, available <a href="https://svn.codehaus.org/mojo/tags/jspc-maven-plugin-1.4.6/src/main/java/org/codehaus/mojo/jspc/AbstractJspcMojo.java">here</a>, it appears that whenever Mac OSX is detected we assume classes.jar will be available, as this is how it has been with Java 6 and prior.

	// Find the tools.jar and add it to the classpath
    String toolsJar = null;
    if (System.getProperty("os.name").equals("Mac OS X")) {
      toolsJar = System.getProperty("java.home")
        + "/../Classes/classes.jar";
    } else {
      toolsJar = System.getProperty("java.home") + File.separatorChar
      + ".." + File.separatorChar + "lib"
      + File.separatorChar + "tools.jar";
    }

To help fix the code a little, we just need to make the following corrections:

*	If we are on a mac, detect the java version
*	If the version is java 7, then we have two options, use the jdk tools.jar or the rt.jar in the JRE. Although we used the rt.jar before, I would rather stick to the JDK and not presume the jre exists.

The code change would look a little something like this:

	// Find the tools.jar and add it to the classpath
	String toolsJar = null;
	if (System.getProperty("os.name").equals("Mac OS X")) {
	  if(System.getProperty("java.version").compareTo("1.7") >= 0) {
		toolsJar = System.getProperty("java.home")
        + "/../lib/tools.jar"; 
	  } else {
		toolsJar = System.getProperty("java.home")
        + "/../Classes/classes.jar";
	  }
	} else {
  	  toolsJar = System.getProperty("java.home") + File.separatorChar
	  + ".." + File.separatorChar + "lib"
  	  + File.separatorChar + "tools.jar";
	}

Let's not stop there either, version 2.0 is in alpha 3 status, and written in groovy no-less. The code for this release is located here, and looks a little different:

	/**
     * Figure out where the tools.jar file lives.
     */
    private File findToolsJar() {
      def javaHome = new File(System.properties['java.home'])
      
      def file
      if (SystemUtils.IS_OS_MAC_OSX) {
        file = new File(javaHome, '../Classes/classes.jar').canonicalFile
      }
      else {
        file = new File(javaHome, '../lib/tools.jar').canonicalFile
      }
        
      assert file.exists() : "Missing tools.jar at: $file"
        
      log.debug("Using tools.jar: $file")
        
      return file
    }

Whilst I am not as proficient in groovy as I am java, a few simple tweaks should fix this file as well:

	/**
 	* Figure out where the tools.jar file lives.
 	*/
	private File findToolsJar() {
  	  def javaHome = new File(System.properties['java.home'])
	  def isJavaSeven = System.properties['java.version'].split ( /\./ )[1] > '6'

      def file
      if (SystemUtils.IS_OS_MAC_OSX && !isJavaSeven) {
        file = new File(javaHome, '../Classes/classes.jar').canonicalFile
	  }
	  else {
        file = new File(javaHome, '../lib/tools.jar').canonicalFile
	  }
    
	  assert file.exists() : "Missing tools.jar at: $file"
    
	  log.debug("Using tools.jar: $file")
    
	  return file
	}

Fixed and submitted to the Codehaus Jira Ticket.

With some simple investigation, we found a workaround to a rather annoying error specific to Mac OSX, the JSPC Maven Plugin and Java 7. With a little more time, hopefully we are able to give a little back to the community of open source my lively-hood relies on. I encourage you to do the same, find a bug, fix it, document it, and submit it for the better of the community.



