# cors-proxy

> reverse proxy with CORS headers

## Usage:

```
  service/URL
  Ex: localhost:3000/https://player.com/test.m3u8
```

## Configuration:

>PORT: port at which the server should listen at
>  PORT=4000 node index.js

>DOMAIN: domain or sub-domain which should be allwed

>  ```
>  DOMAIN=example.com PORT=4000 node index.js
>  ```
> When the request referer's domain or sub-domain matches any one of "example.com", "http://abc.example.com", "https://www.example.com" or "https://www.abc.example.com", we set 'Access-Control-Allow-Origin' dynamically to referer's address.


## License

MIT
