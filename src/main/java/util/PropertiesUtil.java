package util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @author Florence
 */
public class PropertiesUtil {
    private static final Properties PROP = new Properties();

    public PropertiesUtil(String fileName) throws IOException {
        InputStream in = this.getClass().getClassLoader().getResourceAsStream(fileName);
        PROP.load(in);
    }

    public String getProperty(String name) {
        return PROP.getProperty(name);
    }
}
