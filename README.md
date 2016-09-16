# cors-proxy

> reverse proxy with CORS headers

## Usage:

```
  service/URL
  Ex: localhost:3000/https://player.com/test.m3u8
```

## Configuration:

PORT: port at which the server should listen at
  PORT=4000 node index.js

DOMAIN: domain or sub-domain which should be allwed

  ```
  DOMAIN=example.com PORT=4000 node index.js
  ```
When the request referer's domain or sub-domain matches example.com, we set allow-origin dynamically.


## License

MIT
