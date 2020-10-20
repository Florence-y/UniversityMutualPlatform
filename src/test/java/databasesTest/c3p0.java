package databasesTest;

import org.junit.Test;
import util.C3P0Util;

public class c3p0 {
    @Test
    public void testBuildDatabases() {
        C3P0Util.getConnection();
    }
}
