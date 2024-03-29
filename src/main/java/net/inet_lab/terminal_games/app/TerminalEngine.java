package net.inet_lab.terminal_games.app;

// Lanterna doc: https://github.com/mabe02/lanterna/blob/master/docs/contents.md
import com.googlecode.lanterna.TerminalSize;
import com.googlecode.lanterna.graphics.TextGraphics;
import com.googlecode.lanterna.input.KeyStroke;
import com.googlecode.lanterna.input.KeyType;
import com.googlecode.lanterna.terminal.DefaultTerminalFactory;
import com.googlecode.lanterna.terminal.Terminal;

import net.inet_lab.terminal_games.common.DisplayDriver;
import net.inet_lab.terminal_games.common.EventDriver;
import net.inet_lab.terminal_games.common.TerminalGame;
import net.inet_lab.terminal_games.common.Utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collections;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static java.nio.file.StandardOpenOption.CREATE_NEW;

public class TerminalEngine implements DisplayDriver, EventDriver {
    private final TextGraphics g;
    private Terminal term;

    private int status_lines;
    private OutputStreamWriter trail;
    private BufferedReader play;
    private static final int TRAIL_VER = 1;
    private final double fps = 5;
    private final int X, Y;
    private boolean write_filed;

    private final static Pattern p_TrlHdr = Pattern.compile("^TRAIL\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)$");
    private final static Pattern p_TrlLnCmd = Pattern.compile("^(\\d+)\\s+(.)\\s*(.*)$");

    @Override
    public int getWidth() {
        return X;
    }

    @Override
    public int getHeight() {
        return Y - status_lines;
    }

    @Override
    public void put(int x, int y, String text) {
        if (x < 0 || y < 0 || x >= X || y >= Y)
            msg("Invalid pos " + x + "," + y + ", text=" + text);
        else
            g.putString(x, y, text.substring(0,Math.min(X,text.length())));
    }

    @Override
    public void msg(String text) {
        if (status_lines > 0) {
            g.putString(0, Y-1, " ".repeat(X));
            g.putString(0, Y-1, text.substring(0, Math.min(X, text.length())));
            flush();
        }
        trail_write("# " + text);
    }

    @Override
    public void log(String text) {
        // Do nothing
    }

    @Override
    public void flush() {
        try {
            term.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run(TerminalGame terminalGame) throws InterruptedException, IOException {
        while (true) {
            final String err = _run(terminalGame);

            if (err != null && err.length() > 0)
                trail_write("# ERROR " + err);

            trail_write("# END OF TRAIL");

            if (trail != null) {
                trail.close();
                trail = null;
            }

            if ("".equals(err)) {
                term.clearScreen();
            }
            else {
                if (err != null)
                    System.err.println(err);

                term.close();
                term = null;
                return;
            }
        }
    }

    private Key pollKey () {
        KeyStroke key = null;
        try {
            key = term.pollInput();
        } catch (IOException e) {
            msg("poll failed " + e);
        }
        if (key != null) {
            KeyType tkey = key.getKeyType();
            Character tchar = key.getCharacter();
            if (tkey == KeyType.Escape)
                return Key.ESC;
            else if (tkey == KeyType.ArrowRight)
                return Key.RIGHT;
            else if (tkey == KeyType.ArrowLeft)
                return Key.LEFT;
            else if (tchar != null) {
                if (tchar == ' ')
                    return Key.SPC;
                else {
                    try {
                        return Key.valueOf(tchar.toString().toUpperCase());
                    } catch (IllegalArgumentException err) {
                        msg("Key <" + tchar + "> ignored");
                    }
                }
            }
        }
        return null;
    }

    /**
     * @param terminalGame  Game reference
     * @return null on normal exit, '' (empty string) on retry, everything else is a error messafe
     * @throws InterruptedException in case of `Thread.sleep` interruption
     */
    private String _run(TerminalGame terminalGame) throws InterruptedException {
        long seed;
        String cmd;
        Matcher m;

        if (play != null) {
            cmd = play_read();
            if (cmd == null)
                return "Error reading trail";
            m = p_TrlHdr.matcher(cmd);
            if(!m.lookingAt())
                return "Invalid trail header " + cmd;
            final int trail_ver = Integer.parseInt(m.group(1));
            final int trail_x = Integer.parseInt(m.group(2));
            final int trail_y = Integer.parseInt(m.group(3));
            seed = Long.parseLong(m.group(4));

            if (trail_ver != 1)
                return "Unsupported trail version " + trail_ver;

            if (trail_x != X || trail_y != Y)
                return "Inconsistent size: trail file " + trail_x + " x " + trail_y + ", terminal " + X + " x " + Y;
        }
        else
            seed = System.currentTimeMillis();

        trail_write("TRAIL " + TRAIL_VER + " " + X + " " + Y + " " + seed);

        terminalGame.init(this, seed);

        cmd = null;
        int tick = 0;
        while(true) {
            tick ++;

            Key gkey = null;
            if (play != null) {
                if (cmd == null)
                    cmd = play_read();
                if (cmd == null)
                    return "Trail file ended prematurely";
                m = p_TrlLnCmd.matcher(cmd);
                if (!m.lookingAt())
                    return "Invalid trail command " + cmd;
                final int trl_tick = Integer.parseInt(m.group(1));
                final char trl_type = m.group(2).charAt(0);
                final String trl_rest = m.group(3);

                if (tick < trl_tick)
                    gkey = null;
                else if (tick == trl_tick) {
                    if (trl_type == 'K') {
                        try {
                            gkey = Key.valueOf(trl_rest);
                        } catch (IllegalArgumentException err) {
                            return "Invalid Key " + trl_rest;
                        }
                    }
                    else
                        return "Invalid trail type <" + trl_type + ">";
                    cmd = null;
                }
                else
                    return "Missed trail stop @ " + trl_tick + " (now at " + tick + ")";
            }
            else {
                gkey = pollKey();
            }

            if (gkey == Key.P) {
                gkey = null;
                while (gkey == null) {
                    Thread.sleep(100L);
                    gkey = pollKey();
                }
                if (gkey == Key.P)
                    continue;
            }
            if (gkey != null)
                trail_write(tick + " K " + gkey);
            if (gkey == Key.ESC || gkey == Key.Q) {
                trail_write(tick + " E NORM");
                return null;
            }
            TerminalGame.Status moveResult = terminalGame.move(gkey);
            if (moveResult != TerminalGame.Status.CONT) {
                trail_write(tick + " E " + moveResult);
                messageBox("GAME OVER\nYOU " + ((moveResult == TerminalGame.Status.WIN)?"WON":"LOST"));
                gkey = null;
                while (gkey != Key.Q && gkey != Key.ESC) {
                    Thread.sleep(100L);
                    gkey = pollKey();
                }
                if (gkey == Key.ESC) {
                    try {
                        term.clearScreen();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return "";
                }
                else
                    return null;
            }
            Thread.sleep((long) (1000 / fps));
        }
    }

    private void messageBox(String text) {
        final String[] txt = text.split("\n");
        final int h = txt.length + 2;
        final String fin = "Press Q to quit, ESC to restart";
        final int w = 2 + Math.max(fin.length(), Collections.max(Arrays.stream(txt).map(String::length).collect(Collectors.toList())));

        final int x = X/2 - w/2 - 1;
        final int y = Y/2 - h/2 - 1;

        g.putString(x, y, '+' + Utils.repeat("-", w) + '+');
        g.putString(x, y+h+1, '+' + Utils.repeat("-", w) + '+');

        for (int ii = 0; ii < h; ii ++) {
            g.putString(x, y + ii + 1, "|");
            g.putString(x + 1, y + ii + 1, Utils.repeat(" ", w));
            g.putString(x + w + 1, y + ii + 1, "|");
        }

        for (int ii = 0; ii < txt.length + 2; ii ++) {
            if (ii == txt.length)
                continue;
            final String t = (ii < txt.length)?txt[ii]:fin;
            int L = t.length();
            g.putString(x + 1 + (w - L)/2, y + ii + 1, t );
        }

        flush ();
    }

    private void trail_write(String text) {
        if (trail == null)
            return;

        try {
            trail.write(text + "\n");
            trail.flush();
        } catch (IOException e) {
            if (!write_filed) {
                write_filed = true;
                msg("Trail: " + e);
            }
        }
    }

    private String play_read() {
        String res;
        do {
            try {
                res = play.readLine();
            } catch (IOException e) {
                msg("Filed to read: " + e);
                return null;
            }
        }
        while (res.charAt(0) == '#');
        return res;
    }

    public void destroy() {
        if (term != null) {
            try {
                term.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            term = null;
        }

    }

    public TerminalEngine statusLine(int status_line) {
        this.status_lines = status_line;
        return this;
    }

    public TerminalEngine saveTrailFile(String trail_file) {
        if (trail_file != null) {
            OutputStream out = null;
            for(int v = 0; out == null && v < 1000; v ++) {
                final String vfile = trail_file + ((v == 0) ? "" : ("." + v));
                final Path p = Paths.get(vfile);
                try {
                    out = Files.newOutputStream(p, CREATE_NEW);
                    trail = new OutputStreamWriter(out);
                    msg("Writing trail to " + vfile);
                } catch (FileAlreadyExistsException e) {
                    trail = null;
                } catch (IOException e) {
                    trail = null;
                    msg("Trail: " + e);
                    break;
                }
            }
        }
        return this;
    }

    public TerminalEngine playTrailFile(String trail_file) {
        if (trail_file != null) {
            try {
                play = Files.newBufferedReader(Paths.get(trail_file));
            } catch (IOException e) {
                System.err.println("File " + trail_file + ": " + e);
                play = null;
            }
        }
        return this;
    }

    public TerminalEngine () throws IOException {
        DefaultTerminalFactory defaultTerminalFactory = new DefaultTerminalFactory();
        term = defaultTerminalFactory.createTerminal();
        term.enterPrivateMode();
        term.clearScreen();
        term.setCursorVisible(false);

        g = term.newTextGraphics();

        final TerminalSize s = term.getTerminalSize();
        X = s.getColumns();
        Y = s.getRows();
    }
}
