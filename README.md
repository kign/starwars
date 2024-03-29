# Starwars
Simple ncurses implementation of old terminal game, can run in a terminal or [Web](https://kign.github.io/starwars/starwars.html).

![Starwars screenshot](https://github.com/kign/starwars/blob/master/etc/Starwars-80x24.png?raw=true "Starwars screenshot" )

Terminal implementation uses [lanterna](https://github.com/mabe02/lanterna/blob/master/docs/contents.md) ncurses Java
library, while Web version uses HTML `<canvas>` and [TeaVM](http://teavm.org/) Java => JavaScript transpiler. 

To rebuild everything, use this command:

```bash
./gradlew --no-daemon clean assemble teavm
```

_(NOTE: The reason we're using `--no-daemon` is because in some circumstances `teavm` task fails to take into account updated source;
though I suspect that's only a problem with multi-module `gradle` projects, but anyway)_

There are three ways you can run it:

 * Using `lanterna`-based Java terminal emulator:

```bash
./gradlew run
```

 * In the current terminal, using `lanterna`-based `ncurses` implementation:

```bash
etc/javarun.sh build/distributions/starwars-1.0-SNAPSHOT.zip
```

 * In the browser, by opening file `docs/starwars.html`

```bash
open docs/starwars.html
```

Or simply use hosted version [https://kign.github.io/starwars/starwars.html](https://kign.github.io/starwars/starwars.html).

Commands:

 * `SPACE` shoot
 * `←` and `→` to control ship's movements and speed
 * `P` to pause
 * `Q` or `ESC` to quit (pause in Web version)

## Implementation notes

 * Project is designed in a modular fashion to make it possible to similarly add other terminal games;
 * We don't yet use colors; terminal version will use your current foreground and background colors, `lanterna` emulator used white on black, Web version is white on teal, which has a benefit of working nicely despite one's local configuration. Still, we might adopt some color palette in the future;
 * Similarly, we don't use Unicode symbols. This makes it more fun :wink:;
 * `TeaVM` doesn't yet support some Java standard library methods added in Java 1.8 or later. This necessitates special library [`Utils.java`](https://github.com/kign/starwars/blob/master/src/main/java/net/inet_lab/terminal_games/common/Utils.java)
 * Originally, I was planning to generate Web Assembly from Java classes, but current version of `TeaVM` sadly has Web Assembly generator broken. That said, there is little downside to using JavaScript version;
 * Also, for simplicity I am not using minifying, which makes generated 3,500-lines JavaScript file [almost readable](https://github.com/kign/starwars/blob/master/docs/starwars.js). There is an option to turn it on in `build.gradle`;
 * When run in a terminal (native or emulator), we save a "trail file" which could then be replayed (when passed as an argument) for testing or for fun.
