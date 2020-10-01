package util;

import java.io.*;
import java.util.Properties;

/**
 * @author Florence
 */
public class PropertiesUtil {
    private static InputStream in ;
    private static Properties prop = new Properties();
    private static String rootValue=System.getProperty("user.dir");
    PropertiesUtil(String fileName) throws IOException {
        InputStreamReader in = new InputStreamReader(new FileInputStream(rootValue+"/src/main/resources/"+fileName),"gbk");
        prop.load(in);
    }

    public String getProperty(String name){
        return prop.getProperty(name);
    }
}
