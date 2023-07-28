package dev.dex.springbootshirtshop.util;

import java.util.*;

public class ExtractJWT {

    public static String payloadJWTExtraction(String token, String extraction) {
        String[] jwtArr = token.split("\\.");
        byte[] payloadBytes = Base64.getUrlDecoder().decode(jwtArr[1]);
        String payload = new String(payloadBytes);
        String[] entries = payload.split(",");

        for (final var entry: entries) {
            String[] entrySplit = entry.split(":");
            if (entrySplit[0].startsWith("{")) {
                entrySplit[0] = entrySplit[0].substring(1);
            }
            if (entrySplit[0].equals(extraction)) {
                if (entrySplit[1].endsWith("}")) {
                    entrySplit[1] = entrySplit[1].substring(0, entrySplit[1].length() - 1);
                }
                return entrySplit[1];
            }
        }

        return null;
    }
}
