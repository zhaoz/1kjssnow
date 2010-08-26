
all: 1k.min.js
	closure --js 1k.js --js_output_file 1k.min.js

clean:
	rm -rf 1k.min.js
