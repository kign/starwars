package net.inet_lab.terminal_games.common;

import java.util.Collection;
import java.util.Iterator;
import java.util.function.Predicate;

public class Utils {
    public static String repeat(String str, int n) {
        StringBuilder res = new StringBuilder();
        for (int ii = 0; ii < n; ii ++)
            res.append(str);
        return res.toString();
    }

    public static <E> boolean removeIf(Collection<E> collection, Predicate<? super E> filter) {
        int n = 0;
        Iterator<E> i = collection.iterator();
        while (i.hasNext()) {
            final E e = i.next();
            if (filter.test(e)) {
                n++;
                i.remove();
            }
        }
        return n > 0;
    }
}
