package util;

import java.io.*;
import java.util.Properties;

/**
 * @author Florence
 */
public class PropertiesUtil {
    private static final Properties PROP = new Properties();
    private static final String ROOT_VALUE =System.getProperty("user.dir");
    PropertiesUtil(String fileName) throws IOException {
        InputStreamReader in = new InputStreamReader(new FileInputStream(ROOT_VALUE +"/src/main/resources/"+fileName),"gbk");
        PROP.load(in);
    }

    public String getProperty(String name){
        return PROP.getProperty(name);
    }
}
