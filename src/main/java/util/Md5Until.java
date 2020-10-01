package util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @author Florence
 * MD5自定义封装工具类
 */
public class Md5Until {
    public static String getMd5(String pInput) {
        try {
            MessageDigest md5Digest = MessageDigest.getInstance("MD5");
            md5Digest.update(pInput.getBytes());
            BigInteger md5HashInt = new BigInteger(1, md5Digest.digest());
            return String.format("%1$032X", md5HashInt);
        } catch (NoSuchAlgorithmException lException) {
            throw new RuntimeException(lException);
        }
    }

}
