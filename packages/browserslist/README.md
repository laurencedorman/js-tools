# Browserslist

- This package contains the manomano browserlist configuration. At the moment we support

1. last 2 versions of Chrome
2. last 2 versions of Firefox
3. Edge since version 17
4. Internet Explorer 11
5. Safari since version 9
6. Safari IOs since version 9

- This configuration can be extendend in package.json adding

```json
{
  "browserslist": ["extends @mano/browserslist-config", "ie 10"]
}
```

- Or overrided.

```json
{
  "browserslist": ["last 2 Chrome versions"]
}
```
