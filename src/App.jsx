import { useState, useCallback, useEffect, useRef } from "react";

//  Assets
const LOGO_SRC =
  "data:image/webp;base64,UklGRjoZAABXRUJQVlA4IC4ZAADQdgCdASqGARgBPjEYikOiIaESuPy4IAMEs7dwue8QD4ANOw73wv/I3fTef9Z599lfzn434tM7XaH/I/JL/VfL7/H/sR7jvvQ9wX9Yf1S/aTtQfuB6gv2g/dX3zvUD/kPUA/of9b62z0AP2V9On9yfhh/uX++/7H+i9nT1AN9C8u9nX+U6WD2J7M/HRdftU+rL5f+2ft98Yv7P/beBfyv/s/UC/D/4//bfy//uv7qcd1a/0AvYD5//bPyI/xn7gfed8T5p/430zfQF+rP9//Kr+p///7z/1XgmeWf5L3AP6J/Xf8x/ff2u/w/1Ef4P/Q+4b3o/Sv+7/z37pf6D7DP5R/R/8Z/aP8b/0P8J////T973sv/Zn2O/1N/6xEe0WL8iIiIiIiIiIiIiIiIXufHBG6Rsfb3d3d3d3d3d2KEFpa9FrEegty77N2tvjBMV6A8zHkdImoez4FMzMzMc86r6MS5641CqZIDECz3dVbmj8yXRVjXi6lZ3MY4azRavd3d1Qu6kfbSrfGIFpCdCXbZgRj7pO4gkTkFli3l5czA0WL8iIYY9nVL/0Z4xVX2S0AMR4VpD5F8Q1VMOLl8RmqavcLRHZlTjmXO9dqDv8zKQYiIiIiIiIiIU60G+3+EVyu81KGX8oEhot3OGrX5HTRs0Wr3d3d3dtsSsijbKXJDVp88u0pG1D+7fGZzaxZQqj+0udKf5inpHGQ6esegpXp0jRavd1PbJCg3sklfAHVcs5V7XL4nuERuh5V/f+A8D145YmeS4cnSv0dd+StOkaKPL926tYRG9PJ2VCif8svqKnWi+b8FH/nQ8GWyIcPKA0/8ESDLcz5tqTdRdz2QPgOzXovvWC/y+EpmZmZmK8fxunb9oXjC+XaLbVEhGUDRT9WckoJSF/8cm+oyMM1TZ853YU1FGpw/rYFJW5KUm5nWSsz0FTwC/R804bE7eQEvvYoIC3cEVp0jRaGE9HdiqHMf5vFMbDDdwfz0Awyh74Q3e4C+ssN3d3d3d3dko78hzcz5PeJLT8ladI0Wr3d0saZYGbeys+tXZv2s9h9/dca7u7u7u7u7u7NvywMZ8UBx6hyYqFxW9ASJ9/kxUStOkaLV7u7upYJsyBlnASpp8dqwUNaxO7u7u7o7t9ZvVjr/aKhJVqFQAg64e/HxdMxiZfL42CZfXaQ461cgvSC1QjqxrXkumI768fVfAzDINkIm12es3QOo6lbq4RJVCHNPyIiFZkCFGmQKB20Sq96CJ1BVBDK5Ui9wcRp8icECpLF+QoAD+/LAHzonXXp/6nATrYAAAAjQ4SnPKF95PKVN9syBlPtVeAZElYybIqqp9t9HmphJ/2Pje9xyEJ/e9SAAENY+pQLEH1oU7pXbu3NfiHjvIltNR12BqLFNXu8GZGBX+2NCWXZqDTTGgSI7ZMipx4xO7fT8CYB8/LjUqeuqnQS/RjoMb01yuaBAzGO+7LMwHDX7yJmCAbr3QLI+scGXolwHfD0RDfmy/57OxsVQovGEkoixDr53gXTWm38oRKk1f23bg9MMWiVT6Ayf0DyegxgtFCZvrN6jJrg2BIvGvamRpbYOly1FmajT7tdRBVUWPVg/YGvPoEHe0KhQBT3XjP7a6ctdslbAGM0dIfDevP4Lpy8bdWuKqaqtunuGcMPGiApaJsiJAGazxA/WYWxw9RPh/ddQZUFNRit8xEGpPsi+kI21KFHDh+5DJuiN9gy9LuWO1RUbR7F+7dERMkliVG1srWL/qz6sgLrT2mhM1bDRHQQ52j+Ce0XIT6ZdrnzHpY405Hi6sSV7fNpDtugj/HFhYik4H2SqC0JOvnY1R21g9rxk1r/4dh8Vz1Qzmc/+mV+m5STAsunjTlp4E/hHHiHhejUVxrnPV53cYF5GZ+ySTSkfUppvxwrM1c1bGON2d/jLMEnqnOol1Jk6rJF6UTPbB7YJ8NgOF+frM3tHjukt24MRSwtD+r/Gu8Mnm6HtrsL46rTnM7y43MktWWEbdoXEGUZFGXgWFcAZbpnLtT/Uk3OVhTgm2mR8CeZkSa9z/aeBFDJYyQtlB0Zv8RHOBnomhBNo/E5Ah4tbcFJfSP9ab+PtO/Ua5kFxDLyW7NHNvz2Ct0p1/rUjdZEIrc55mhM+W+y1sBU4Yjf08fRZVrXyJ4kStvQoKAjQfP1ACS7GdwwUhUj4fgvyIsS3Z5dG927R4saPZX41574WqgN+9s4V+JBplsEEf/8D5/NosKAaJ8yla3o8HKWM3cpFOAy3antlNhRf57+N/9pmR6EtnqEz0tqz6vp/9gkNuG40tl4kQKUjymIfpy4aQcog58cY+S/t+eu4LmkEwVfex+Dng9jX+Uxn8fpixKHshHju1znHZFbenggJxs7fIKbeXxvRmCy76RBw+y2uRPLiK1O5zc4J3MOBZvRqTGet9Jum24l5qcLKzpamrMbcPwIZuQF7t5lZz+uBlN7cIjuW6UHZeYva6BNa4hLPbRebT0AV20NuF0Hk3M2OhscQ4QkHWMEftDi2YmtdPV8PUpoWL4F+yl2DzqyktoDGiXZ99qK6COXUc44nEpYkS/JwHgpv/1s2oO3siJKoXa80jC+jHh9f4ZSFPz7vlRdWwtcJLSmkUIf/47Er9fNCO3DvoecFd/xYm+K/CdG/0J3e86+HDWieQ5vaEC1z9AH+dsKUDGfkvdSC8dUlNM4BzO7lc2Hg0BjSk03/7HAgGfxITcN+x5+JM0M7e/NUKcG5DgrGBhwoKGlWIXG9pDBd1thzxtk1jJTSogtpJnkAq4fQQO4A6cg6v1p5gbwbN61zpKAAPoAOe0T+iby26abF4t5bEc/3LDSxvmYzt5nj/zbuaMS/1VJ9mlVnlgbLnLTsoxtpAWaTvxamYxm991TX55oS+i+DPTypxMjiT+Dh3VGvHmtkmETTSQUl8qDzTIanj9+Cza7QxZBQyOnwxiePeidPYWtiDqEhrcLy/8N11rUO4j00TcFJ3SuIlkr5B+wlCOInhHj0cf1CLNlRzQfTnJ6L1b8rg3Vuo/MB2e33O6Dwx3cqJ3DooxSXEkWy8Ip6msHPuAnIb9p94vgtJ2fGXlvpub5q2QZo+5N+u1oAWSHg7lkMeZeAjBsiTCYs/4+2dMqbeNkRMUu93kCGUORzrDJUnOol1ddw/jbCtJwZPC4QZuGP9Bh7nL9qHnVzXigkPounNrajFlzpf50XlAT+m18vlrpRUQY1aWD5RKZmUTYU1zzxJY9yuBa2bSYz3oP8pPRnX//Ge88n7gftOcLGTcZX8vJttHMnhaeSKy14fhDTP7U+NAFV/t7HMubQ8Hv5MH9XIvmKfM+t03gQgdyl2/RtpuF9osPdx9QTbxM1yTmwHCU4a8M+YtfjoxfWfyLdy+sHifz0DZzBUrzuu++/keM/ZBv5BC2be3ZLSxEepXUobmBF56ugenfX+XKPYAN82m5D/+saATHpMct28C7OyxQ7WK3oweH9+WlsftkAcfox9mjH1G7UZ7lMahIrB86I3Dl9H+juA/k+7of5tHygMs3v5feWEGbsc3S/6UEaISdavzg0549jxq/7kk8csVomFZmAVmwAABBZtoMq70GIDwb0ZRP7r8sRPwtU9y+SZlhAfj9RSj/xkypyL676km6voQs2YYGI6/Xykfia10oyHlU+WBzPFdxitztu1sH3FCBWnLB36qNv13P3L3VpUvcj/gxQYUD3HDoaJ8QSJn4S/RhEB0Ao1SgHifhN9zjy9b9+xULo47OapmuUKyhY5vfYUjWwhZgTjm5f6YgAXZVK/jzPYY0HG8b2GxaWMcy1yMD8GsUuVKP4Su8Il8wx7D88bxs06jH80Lzr2B+ffLfet2Z3tlYqPzrozbOZ6qcHZd2JSfgoiPZf0/OJbpqnhs9FEuJVedu+cVUH61S3ALdD24quP0fsjixCg/8bQcu4w3/Ff84zXlhXteYrenPq4QMFt9GuRrXRIr+PrK4ya88sxyK1/VvlRuf4AKbR09fFAHs0MW8oIbjT2cwYVEX/CGl/6z+U6dSXqor5A+dsIMvRLTyhRi5yjzDexNjV9OEVv9W4yoMc/UGgYwKTO33Lsu+gK9nLP+5y8dPDhoCDKnhYfYulP3dVUYzlhDtqZkO0IF/4CeZIVGh/qB07Tme/4DUrsAeoHRg4ty8bQ5HXpqxS8v6Owv4J++wLlFXJm7WYQE9qJLTKaTBv54DZ0k8omJbq38ATH80tphpR6Kg7XUDVK1KIB3SVgUMsCS8Ipi1W3A2hT9eyM03i5bzf6uVAgDETB3o6K4OerRT8edLeLwTOXVFR7RNvzmBuoiTMzU5bqaY3kV2gNVrB9o9qebc29XqmkH58C3O5918KaIo/rDKObL/CqyO/DGsfVeYwHtCVq22dMPr2oRjHTT55rfNfrZ1Ug+BbcQmtdv7gWYF7mV/n4up0SRtSfYFgIBnKjV9OtGy3ToefdzQrGuFct7hQH/hdasLpuZMIlc6EgXys4CoxeDX61htAyoGvWAMxQAuLF63OnQqlBpUHi2biWwBWoW/RE/wp3DCffHKOqg1e4lDZd/xnD9z6b2JRJTmhd46uFQs3n0OXRmX7wMxJJYRvbJlQeNloFVwfmdUAgf+8DKKJXkci8gGTgLVlsbDII1USpWsTojztqwSt1EFrcmIiCdJL+r35FlVe0WptMd/e1wsktrooyVEIRfSowz/i6LikELMcjGgKeJ09MJcjHorIGm8qhYTbvFerPXFGhJRCKZvaymMGKM2oXMTvOs/sR6YeYnSflrfwYthrjrI4dFo9U7+EFqOD5efTX4R2kMt2R6nXROSgGzm0ysvayNHu1+rBbwO+tv/zufRAMLxziAcSIuhQtWbGV4a1ppKn9lo7FSFyX4tAMEX2PsTFCN1AGgVn2eLnmkfQgpc2Rgbs7PCKAOgVtpxtqmt4O4fO5WNkArXD+bXCYoE89t5mh0qD6/cVUswq+RDPCrQ+vV1Npp5lr1KvXMauAQBVIK5Ibo1e2YfTAaK7xVNzPKDac8GloEiFpHo/f86jLxTMPjZdDeEu4ceaMSZIPTsJfmyBF97xDVRQ4IMiLagjO97eFvQfD8LehlkV5yrX4wbpopGy3vJwzYnCjwpM3pdi0yHeVdWpcWJoUaEuQcxZNjAh5bEuNYa5FBhJxAOTKtcx51hLH7tMGIml4JuYtegssuxzkW0eLoOEkpKv83lbNBjU2mC2/p1zCgf7vHn3TioQPT/dh6qZRMgWFeyTZETGtWCe016n11GQtoORWZKcpQD5mPC6tgELuZn1Ffx+ITaNhx/jyfl+dd3S/R8epQSUSiYJmSHjXNov3nkSrfcJyDbgQ1sc/Y9WRg/Cb8FTsIFt32J5OPx2p1xJIZIVkEDVM4f5GhNThtWBA/4KslGvPbXlLkOfq/7RE+wxrc3lk03lWlhQD21qXbA6TRNTzVoHC6EKsXdAV2JgyhpiWMepMSql3BjhpJyWjcQYuUWV9YQwY76E3qaBhB4mWZB1rvzizj0Izul6X/0LgqUMIVpkiIBw8c2zIulgXHp+6TG9KmYOpodm+3m0CZwJL9rkmaeCZ5g9HNlRMHtORK35kgKvW68Q7HGgT+1x5NES/vCqBFwRth6GOOIpFrkvojcO7foF3k2nb2M4+IEFK7cqJy9ZjDslLx1hOSAequqEcv2FMgL9Kp3pfuFx7Ctub0waJ4Okgx0j/r2eRcjK7JDagiHlshiPErlgWvgxglJJDB74rG51DzCWaKxhS1YZ3u46/YqP9xhd9fjBrPUsy/d23Zgrg3PIGq22slaLutEJgBk3RKAviUAQQWoXeypcSspOna263jHoIhR2IFKV08vqwf2yIEZ7vkdZHtev4x3u7KBtcw7/tACXZ615V2ACRa1tfONUk700GG8jhMMK01B5y8DpFVbUyJR3nvz+lfanBkzTOZKBvUHmCk3sFLcDPpsDEm5QGjeN67Xnp7ZfF8rSASdnJqJEXHd5vlQAL/Mg0mEhsFqZ6Vo0W2dvg6R8KCXSseK7U7tDxCYiYWQmRYeJhRuH1OKzcT9l48/1vsHU/acf7SivAN3Hgjt9Ad9KxTqAU58AaPtlxsUrpGU0XgBEZCiSuGhCuM1LLierL+gAXebC9b5SmojFl8sp+pbbVX1epq3geWmmBj+zf7tuTFxRlnRU+aGhBOYIWF/Y29Y0GybKP/wpuasDBRTA0sQzDgAA9VfojtAq4o04enpXJZeTponh4rs4fvPjKCpyriJYTWN3pbBNrE7PDK7ttSjW3l/mJbZNtoEtSPLuRvX8CxUmViRSDtL6rn8kbNWiUXg9xmeXTO8HiKeK8RhxNs3VPerwHp9jv6uYM9Q4SIYxElmNxSdjRi9Ndg4KqPI6EDuIbp09L4vGUBq254MTFSXO/1/6cv1mxZl9TC6/C8uK92OMpXq6gHtD8KQDNA/vgfph9SZcIjHnC7Rv6hw/C86wIl51M3UbsjV2LAAAVReJDMTHbHBP1kOvrIEq18z/0p5YjhDg2zr6OGIGp6oJDW7isb829R0hhnbuE9D9kR9vHHEsvHjb091HZHHnaXXoLoNt+FVjVeEtJEzrxfATLyzJhaF7M16cG90aa6xr0vR+86eaYXRB+NPEC63sE8ORWNKyTNdY3ZRqMIs4mkNbdLVWcWAchmWCi/htyz/DhyA0R16V2REQ4YIPPjgPooVHbffx46yxWVK9vqXHTzyQ6PC1rGAC5VjpxcPsXxeAUTCQTbr8SXx489Sv+XtgrUux3CbkjT29LgPiZNxGSnSkVUWFUfLCFusjT9lgAAP2kl6dPfxSqHOOeuvF7dtlDhJOymwzUOKbcAWZUYK2BNLI3teh50rm61mqpo9FhtdjlQgYkukNRFOqVxlRGs9B+3IGQbJtcEeTHWIKaszmjaJwNsBud0KBm5kMi7yI1djn0DK6q/AE/tZAspbIUheT/llRWwqpq3r6+AgIrWwJxBmArYj3bMZKPrY0a6OmxdjV8tusLD3YbXhhXWBcbQbYAW8bQR1LjgSKlN5p9BXwkDVB5wAG1/BQ7PdbujaDFCjyil9xSOCkpnTZmuQxPlO74E4iqdOXFI3JyUaRZ+BcHTKFyyZmbfpvO1MtkrV2UZCyMC/DX0bCC+B2TgV7U4B2LyiX676TiSe8f7tYennYDd0TwHUZasFoInX/SU0gPllJdbrQ9cfyEEGRaaXD1MvQXjtfXVJ/xakbEP39k7aMA7/T/IYt+zaRlCad/H4pB64d+Sj4rnxyu+atQANBOQlWpg/g8Qc4mfgfyPIY28KJuDCnEUSI7blISxUm3WSxHD9injf+ifsOGg0ex27VaNKdC6rPQACbxZ2N9IhtvCBJfWwNDpSVyfG2h+pzPXHxt+ZBf6IkMiAl2ro0rfwzmvNTh7OdGNkCYlvH+CakN+jWM2WM6sdpk0vXIF92elq48mKakWnXLubPsM/vdbCmN8wElOA0zaZWKvAZaCSdvBv3m13LRxzb8lRMpsPooF/ZHx02h/g4vXreR0yMWnn/8Up/SXDpWhmmMNqjaw4ij8roE9f84PdwC9Z/2Cw0ACqwpQeqWUz/VU5+UzPePqV19fVTnE1Wq1vR3XYIkG9+v7gLRYWgIE+U9NFNFO+IqL3/egN8PSHRc9pAmjspq9QvlK6ZInzM6pszP1FmXXienDfG5/y2yncjQnX/CYm+OXpLphTwP9Fk4P3NRWns/ysV2rz9lVz8qDfth7FVqTUGmVqkhmxele77Z8HdecMbh8s9F0fLf0eOuXX/9McFW4Oiya23f4tPJL1kYQu8dIUXto61HmK5Yj9n/ZdwMUin/PsvHJa0KlbF/G7O2uty38r/xXkPEu1zFyFgdpi6SvyiTr617x/BSKicnR2xoPIiA8n2u+sY3iMwGAJTCHC04ylJ+UqhbW7zcSdos3SdrQTQ8+0Bkzwl25Dw+lMJ7t2RgLh0j55Q2X38NI+HLgJ3HNX9QrANS4QRVeLYmkzri6LOMNpYHasrWPBdARXbDwGxYppguQjWziDxJWkVUKr/56NZhs5/nfbJ6biXmAHr+BpY+q2d9w5CwHwWxJq+dE4k4TZkZE7y7/Z0mWfRUJkWJoyMLFTaz1jIMAzQgVOYg3tUA4T/Jkgd9yjS0h8nG/werXmWn77zLIUXGQrxhMXkE8lRhzctvomvYMyzy2UOWT/PH+HJm7WT/w7En8XE0ydUAQ3bWsX6b/LOa8JHeuZkHb19zBM3Z5Z7DSF/5OCJB9V1oEZOEpeScgDb30sBSElSk9Hw/UvIDjs5DJSKdwx5nzIwn10EZSrf8nqqYMXD3dZrcEWpfrFRSaFQCNy7XAm9kRzU+rv1zhnJ+/ygSfcbwjklUkJprXfsfDIZjgk//ekVzJpQJnGw63AlTz7TgtjpoqfChXtMbHiD63YEZXlmg5LOJgnKDFDwhTU1m1yS/dB9tbRdvTRMEowks9h6T5+o4SKdc0h3AmefyGDpgUaK6O/x9OnpeEs4Go5sf3Rm6I1cK3rBDWZsg2BS7MhGzCnCvehBxtbcRpGYy1Bh6o04RLwdzjeDV4IWNzBHgBZoYhNIZk+AQetO3zJk/TVBfFeVgEah6TCyNPs5HrHTRkY+1AAAAAA==";

// Styles
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --cream:#F5F0E8;--cream2:#EDE8DF;--cream3:#E5DFD4;--white:#fff;
    --text:#1C1C1C;--text2:#4A4A4A;--text3:#7A7A7A;
    --terra:#C0503A;--terra2:#A8422E;--terra-light:#F2E8E5;--terra-mid:#E8C4BC;
    --border:#D8D2C8;--border2:#C8C2B8;--gold:#D4A847;
    --serif:'Playfair Display',Georgia,serif;
    --sans:'Inter',system-ui,sans-serif;
    --r:8px;--rl:12px;
  }
  html{height:100%;font-size:15px}
  body{background:var(--cream);color:var(--text);font-family:var(--sans);min-height:100%;line-height:1.6;-webkit-font-smoothing:antialiased}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:var(--cream2)}
  ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:99px}
  button{font-family:inherit;cursor:pointer;border:none;background:none}
  input{font-family:inherit}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @keyframes barBounce{0%,100%{transform:scaleY(.2)}50%{transform:scaleY(1)}}
`;

// Data 
const COURSES = [
  {
    id: "crypto-fundamentals",
    title: "Cryptocurrency Fundamentals",
    instructor: "Alex Rivera",
    category: "Crypto",
    rating: 4.9,
    students: 5821,
    duration: "7h 40m",
    level: "Beginner",
    description:
      "Go from zero to confidently navigating Bitcoin, Ethereum, and the broader crypto ecosystem.",
    longDesc:
      "Understand the blockchain technology behind Bitcoin, how Ethereum enables smart contracts, how wallets and keys work, and how to evaluate projects before putting any money in.",
    color: "#030302",
    modules: [
      {
        name: "Blockchain Basics",
        lessons: [
          { title: "What Is Blockchain & Why It Matters", desc: "Distributed ledgers, consensus mechanisms, and the double-spend problem.", dur: "32:00" },
          { title: "Bitcoin: Digital Gold Explained", desc: "How Bitcoin works from first principles — mining, halving, and the fixed supply model.", dur: "36:00" },
          { title: "Ethereum & Smart Contracts", desc: "The programmable blockchain: DeFi, NFTs, and DAOs.", dur: "34:00" },
        ],
      },
      {
        name: "Wallets & Security",
        lessons: [
          { title: "Wallets, Keys & Seed Phrases", desc: "Hot wallets, cold wallets, hardware wallets — and how to never lose your crypto.", dur: "28:00" },
          { title: "Exchanges: CEX vs DEX", desc: "Centralised and decentralised exchanges — how to buy, sell, and move assets safely.", dur: "30:00" },
        ],
      },
      {
        name: "Market & Project Analysis",
        lessons: [
          { title: "Reading Crypto Charts & Market Cycles", desc: "Bull markets, bear markets, halving cycles, and on-chain data signals.", dur: "38:00" },
          { title: "How to Evaluate a Crypto Project", desc: "Tokenomics, whitepaper analysis, team vetting, and red flags.", dur: "35:00" },
          { title: "DeFi: Lending, Staking & Yield", desc: "How decentralised finance protocols work and how to participate safely.", dur: "37:00" },
        ],
      },
    ],
  },
  {
    id: "forex-trading-mastery",
    title: "Forex Trading Mastery",
    instructor: "Sophie Nakamura",
    category: "Forex",
    rating: 4.8,
    students: 4103,
    duration: "9h 15m",
    level: "Intermediate",
    description: "Learn to trade the world's largest financial market — currencies, pairs, and proven strategies.",
    longDesc: "The foreign exchange market turns over $7 trillion a day. This course teaches you how currency pairs work, how to read economic data that moves markets, and how professional traders manage risk.",
    color: "#000000",
    modules: [
      {
        name: "Forex Foundations",
        lessons: [
          { title: "Currency Pairs: Majors, Minors & Exotics", desc: "How forex pairs are quoted, what moves them, and how to read a live rate.", dur: "28:00" },
          { title: "Pips, Lots & Leverage", desc: "The mechanics of forex position sizing, leverage ratios, and margin requirements.", dur: "30:00" },
          { title: "The Global Macro Picture", desc: "Interest rates, central bank decisions, and the economic data that drives currencies.", dur: "36:00" },
        ],
      },
      {
        name: "Technical Analysis",
        lessons: [
          { title: "Support, Resistance & Market Structure", desc: "Identifying key price levels and understanding how the market moves between them.", dur: "38:00" },
          { title: "Candlestick Patterns That Work", desc: "The high-probability candle setups professional traders actually use.", dur: "34:00" },
          { title: "Moving Averages, RSI & MACD", desc: "Core indicators — how they work, how to combine them, and common misuses.", dur: "36:00" },
        ],
      },
      {
        name: "Strategy & Risk",
        lessons: [
          { title: "Building a Forex Trading Strategy", desc: "Entry rules, exit rules, and how to back-test before risking real money.", dur: "40:00" },
          { title: "Risk Management: The Professional Approach", desc: "Position sizing, stop-loss placement, risk-reward ratios, and drawdown management.", dur: "38:00" },
          { title: "Trading Psychology & Discipline", desc: "Controlling fear and greed — the mindset that separates profitable traders.", dur: "35:00" },
        ],
      },
    ],
  },
  {
    id: "stock-market-investing",
    title: "Stock Market Investing",
    instructor: "Marcus Webb",
    category: "Investing",
    rating: 4.9,
    students: 6244,
    duration: "8h 50m",
    level: "Beginner",
    description: "Build long-term wealth through stocks — fundamentals, valuation, and portfolio construction.",
    longDesc: "From understanding financial statements to valuing companies and building a diversified portfolio, this course gives you the foundations of equity investing used by professional fund managers.",
    color: "#000000",
    modules: [
      {
        name: "Market Fundamentals",
        lessons: [
          { title: "How Stock Markets Work", desc: "Exchanges, brokers, market makers, and what happens when you buy a share.", dur: "30:00" },
          { title: "Reading Financial Statements", desc: "Income statement, balance sheet, cash flow — the three documents every investor must understand.", dur: "42:00" },
          { title: "Key Valuation Metrics", desc: "P/E, P/B, EV/EBITDA — what each ratio tells you and when to use it.", dur: "36:00" },
        ],
      },
      {
        name: "Investment Approaches",
        lessons: [
          { title: "Value Investing: The Buffett Approach", desc: "Intrinsic value, margin of safety, and the long-term compounding mindset.", dur: "38:00" },
          { title: "Growth Investing: Finding Tomorrow's Winners", desc: "Revenue growth, TAM, competitive moats — how to identify breakout companies early.", dur: "36:00" },
          { title: "Index Funds & Passive Investing", desc: "Why most active managers underperform — and how to beat them by doing less.", dur: "32:00" },
        ],
      },
      {
        name: "Portfolio Management",
        lessons: [
          { title: "Diversification & Asset Allocation", desc: "Building a portfolio that matches your goals, risk tolerance, and time horizon.", dur: "35:00" },
          { title: "Tax-Efficient Investing", desc: "ISAs, SIPPs, tax-loss harvesting, and how to keep more of what you make.", dur: "31:00" },
        ],
      },
    ],
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis: Charts & Patterns",
    instructor: "Yuki Tanaka",
    category: "Trading",
    rating: 4.8,
    students: 3876,
    duration: "7h 20m",
    level: "Intermediate",
    description: "Master chart reading, patterns, and indicators to time entries and exits with confidence.",
    longDesc: "Technical analysis is the language of price action. This course teaches you how to read charts, identify high-probability patterns, and use indicators intelligently — applicable to stocks, forex, and crypto alike.",
    color: "#000000",
    modules: [
      {
        name: "Price Action Foundations",
        lessons: [
          { title: "Candlesticks: Every Pattern Explained", desc: "From doji to engulfing — every major candlestick pattern with real chart examples.", dur: "40:00" },
          { title: "Trend Lines, Channels & Market Structure", desc: "Drawing valid trend lines, identifying channels, and trading with the trend.", dur: "36:00" },
        ],
      },
      {
        name: "Chart Patterns",
        lessons: [
          { title: "Continuation Patterns: Flags, Wedges & Triangles", desc: "Patterns that signal the trend is pausing before continuing.", dur: "38:00" },
          { title: "Reversal Patterns: Head & Shoulders, Double Tops", desc: "Classic reversal signals and the volume behaviour that confirms them.", dur: "36:00" },
          { title: "Support, Resistance & Supply/Demand Zones", desc: "The difference between lines and zones — and why zones matter more.", dur: "34:00" },
        ],
      },
      {
        name: "Indicators & Systems",
        lessons: [
          { title: "Volume Analysis: The Professional Edge", desc: "On-balance volume, volume profile, and what volume tells you that price cannot.", dur: "35:00" },
          { title: "Building a Complete Trading System", desc: "Combining price action, indicators, and risk management into a coherent strategy.", dur: "42:00" },
        ],
      },
    ],
  },
  {
    id: "personal-finance-wealth",
    title: "Personal Finance & Wealth Building",
    instructor: "Amara Diallo",
    category: "Personal Finance",
    rating: 4.9,
    students: 8102,
    duration: "6h 30m",
    level: "All levels",
    description: "Take control of your money — budgeting, debt, savings, and building real long-term wealth.",
    longDesc: "Most people were never taught how money actually works. This course fixes that — from building an emergency fund and eliminating high-interest debt to understanding compound interest and investing for retirement.",
    color: "#000000",
    modules: [
      {
        name: "Money Foundations",
        lessons: [
          { title: "Budgeting That Actually Works", desc: "Zero-based budgeting, the 50/30/20 rule, and how to find money you didn't know you had.", dur: "32:00" },
          { title: "Debt: Good, Bad & How to Eliminate It", desc: "Interest rates, avalanche vs snowball methods, and why high-interest debt is an emergency.", dur: "35:00" },
          { title: "Emergency Fund & Financial Safety", desc: "How much to save, where to keep it, and why this is the foundation of everything else.", dur: "28:00" },
        ],
      },
      {
        name: "Building Wealth",
        lessons: [
          { title: "Compound Interest: The 8th Wonder", desc: "Time value of money, compound growth, and why starting at 22 vs 32 changes everything.", dur: "30:00" },
          { title: "Pensions, ISAs & Tax-Advantaged Accounts", desc: "Making the most of employer matching, tax wrappers, and long-term account strategy.", dur: "36:00" },
          { title: "Protecting Your Wealth: Insurance & Wills", desc: "Life insurance, income protection, and why everyone needs a will before they think they do.", dur: "29:00" },
        ],
      },
    ],
  },
  {
    id: "defi-web3",
    title: "DeFi & Web3: The New Financial System",
    instructor: "Lena Fischer",
    category: "Crypto",
    rating: 4.7,
    students: 2341,
    duration: "8h 10m",
    level: "Intermediate",
    description: "Explore decentralised finance — lending protocols, DEXs, yield farming, and the future of money.",
    longDesc: "DeFi has rebuilt banking, lending, and trading on open permissionless blockchains. From Uniswap and Aave to liquidity pools, impermanent loss, and governance tokens — navigate the space with confidence.",
    color: "#000100",
    modules: [
      {
        name: "DeFi Fundamentals",
        lessons: [
          { title: "How DeFi Reinvents Finance", desc: "From centralised to decentralised — why trust-minimised protocols change the rules.", dur: "32:00" },
          { title: "Automated Market Makers & Liquidity Pools", desc: "How Uniswap works, what liquidity providers do, and impermanent loss.", dur: "38:00" },
          { title: "Lending & Borrowing: Aave & Compound", desc: "Supplying collateral, borrowing against it, and managing liquidation risk.", dur: "36:00" },
        ],
      },
      {
        name: "Advanced DeFi",
        lessons: [
          { title: "Yield Farming & Liquidity Mining", desc: "Chasing yield across protocols — the rewards, risks, and gas cost calculations.", dur: "40:00" },
          { title: "DAOs: Governance & Tokenomics", desc: "How decentralised autonomous organisations make decisions.", dur: "35:00" },
          { title: "DeFi Security: Hacks, Audits & Rug Pulls", desc: "The most common DeFi exploits and how to protect yourself.", dur: "37:00" },
          { title: "Layer 2s & the Future of DeFi", desc: "Optimistic rollups, zk-rollups, and why Layer 2 networks are making DeFi accessible.", dur: "32:00" },
        ],
      },
    ],
  },
];

const CATEGORIES = ["All", "Crypto", "Forex", "Investing", "Trading", "Personal Finance"];

const LEARNING_PATHS = [
  { emoji: "₿", name: "Crypto & Web3", count: "48 courses", cat: "Crypto" },
  { emoji: "💱", name: "Forex Trading", count: "35 courses", cat: "Forex" },
  { emoji: "📈", name: "Stock Investing", count: "52 courses", cat: "Investing" },
  { emoji: "📊", name: "Technical Analysis", count: "29 courses", cat: "Trading" },
  { emoji: "💰", name: "Personal Finance", count: "41 courses", cat: "Personal Finance" },
  { emoji: "🎯", name: "Options Trading", count: "23 courses", cat: "Trading" },
  { emoji: "🎯", name: "Trading Awareness ", count: "23 courses", cat: "Trading" },
  { emoji: "🎯", name: "Prospective  Trading", count: "23 courses", cat: "Trading" },
  { emoji: "🎯", name: "Futuristic  Trading", count: "23 courses", cat: "Trading" },
  { emoji: "🎯", name: "Cordinating Finance", count: "23 courses", cat: "Trading" },
];

const TESTIMONIALS = [
  { quote: "The Crypto Fundamentals course gave me the confidence to actually invest. I went from totally confused to holding my first Bitcoin within a week.", name: "Priya Mehta", role: "First-time crypto investor", initials: "PM" },
  { quote: "I went from knowing nothing about forex to making my first consistent profitable trades in 3 months. The risk management lessons alone are worth it.", name: "Tom Eriksson", role: "Part-time forex trader", initials: "TE" },
  { quote: "The Stock Market Investing course changed how I think about money entirely. I've built a proper portfolio for the first time in my life.", name: "Clara Dubois", role: "Long-term investor", initials: "CD" },
];

//  Helpers
const parseDuration = (str = "0:00") => {
  const [m, s] = str.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
};

const formatTime = (secs) => {
  const t = Math.max(0, Math.floor(secs));
  return `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;
};

const getAllLessons = (course) => course.modules.flatMap((m) => m.lessons);

// Hooks 
function useEnrollments() {
  const [enrollments, setEnrollments] = useState({});

  const enroll = useCallback((courseId) => {
    setEnrollments((prev) =>
      prev[courseId] ? prev : { ...prev, [courseId]: { completedLessons: [] } }
    );
  }, []);

  const markComplete = useCallback((courseId, lessonIdx) => {
    setEnrollments((prev) => {
      const e = prev[courseId];
      if (!e || e.completedLessons.includes(lessonIdx)) return prev;
      return { ...prev, [courseId]: { ...e, completedLessons: [...e.completedLessons, lessonIdx] } };
    });
  }, []);

  const getProgress = useCallback(
    (course) => {
      const e = enrollments[course.id];
      return e ? Math.round((e.completedLessons.length / getAllLessons(course).length) * 100) : 0;
    },
    [enrollments]
  );

  const isDone = useCallback(
    (courseId, idx) => enrollments[courseId]?.completedLessons.includes(idx) ?? false,
    [enrollments]
  );

  return { enrollments, enroll, markComplete, getProgress, isDone };
}

function useVideoPlayer({ totalSeconds, onComplete }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    if (!playing) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setElapsed((t) => {
        const next = Math.min(t + 0.5, totalSeconds);
        if (next >= totalSeconds) {
          clearInterval(intervalRef.current);
          setPlaying(false);
          onCompleteRef.current?.();
        }
        return next;
      });
    }, 500);
    return () => clearInterval(intervalRef.current);
  }, [playing, totalSeconds]);

  const reset = useCallback(() => { clearInterval(intervalRef.current); setPlaying(false); setElapsed(0); }, []);
  const togglePlay = useCallback(() => setPlaying((p) => !p), []);
  const seek = useCallback((pct) => setElapsed((pct / 100) * totalSeconds), [totalSeconds]);
  const pct = totalSeconds > 0 ? (elapsed / totalSeconds) * 100 : 0;

  return { playing, elapsed, pct, togglePlay, seek, reset };
}

function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);
  const show = useCallback((msg, type = "green") => {
    clearTimeout(timerRef.current);
    setToast({ msg, type, k: Date.now() });
    timerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);
  return { toast, show };
}

//  Shared UI Components 
function Toast({ toast }) {
  if (!toast) return null;
  const dot = { green: "#4caf7d", gold: "#d4a847", red: "#e05c5c" }[toast.type] ?? "#4caf7d";
  return (
    <div key={toast.k} style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999, display: "flex", alignItems: "center", gap: ".6rem", background: "var(--text)", color: "#fff", borderRadius: "var(--r)", padding: ".8rem 1.2rem", fontSize: ".82rem", boxShadow: "0 4px 20px rgba(0,0,0,.2)", maxWidth: 300, animation: "fadeUp .25s ease both" }}>
      <span style={{ width: ".45rem", height: ".45rem", borderRadius: "50%", background: dot, flexShrink: 0 }} />
      {toast.msg}
    </div>
  );
}

function CategoryBadge({ cat }) {
  return (
    <span style={{ display: "inline-block", fontSize: ".72rem", fontWeight: 500, color: "var(--terra)", background: "var(--terra-light)", border: "1px solid var(--terra-mid)", padding: ".2rem .6rem", borderRadius: "99px", marginBottom: ".75rem" }}>
      {cat}
    </span>
  );
}

function ProgressBar({ pct, height = 3, style = {} }) {
  return (
    <div style={{ height, background: "var(--cream3)", borderRadius: 2, overflow: "hidden", ...style }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "var(--terra)", borderRadius: 2, transition: "width .5s" }} />
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", style = {} }) {
  const base = { fontSize: ".9rem", fontWeight: 500, padding: ".7rem 1.4rem", borderRadius: "var(--r)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: ".4rem", border: "none" };
  const variants = {
    primary: { background: "var(--terra)", color: "#f7f1f1" },
    secondary: { background: "var(--white)", color: "var(--text)", border: "1px solid var(--border)" },
    outline: { background: "transparent", color: "var(--terra)", border: "1px solid var(--terra)" },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>{children}</button>;
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--terra)", marginBottom: ".75rem" }}>{children}</div>;
}

function SectionTitle({ children, style = {} }) {
  return <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, letterSpacing: "-.01em", ...style }}>{children}</div>;
}

//  Course Card 
function CourseCard({ course, enrolled, progress, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "var(--cream)" : "var(--white)", padding: "1.75rem", cursor: "pointer", transition: "background .18s", position: "relative", borderBottom: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,var(--terra),var(--gold))" }} />
      <CategoryBadge cat={course.category} />
      <div style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", fontWeight: 700, marginBottom: ".3rem", lineHeight: 1.3, letterSpacing: "-.01em" }}>{course.title}</div>
      <div style={{ fontSize: ".82rem", color: "var(--text3)", marginBottom: ".5rem" }}>by {course.instructor}</div>
      <div style={{ fontSize: ".82rem", color: "var(--text2)", lineHeight: 1.55, marginBottom: "1rem" }}>{course.description}</div>
      {enrolled && (
        <div style={{ marginBottom: ".75rem" }}>
          <ProgressBar pct={progress} style={{ marginBottom: ".3rem" }} />
          <span style={{ fontSize: ".7rem", color: "var(--terra)" }}>{progress}% complete</span>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ fontSize: ".82rem", color: "var(--text2)" }}><span style={{ color: "var(--gold)" }}>★</span> {course.rating}</span>
        <span style={{ fontSize: ".82rem", color: "var(--text2)" }}>👥 {course.students.toLocaleString()}</span>
        <span style={{ fontSize: ".82rem", color: "var(--text2)" }}>⏱ {course.duration}</span>
      </div>
    </div>
  );
}

//  Navbar 
function Navbar({ page, setPage, enrollCount }) {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2.5rem", height: 64, background: "var(--cream)", borderBottom: "1px solid var(--border)" }}>
      <div onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: ".5rem", fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 600, cursor: "pointer" }}>
        <img src={LOGO_SRC} alt="YouLearn" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 4 }} />
        YouLearn
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {[["courses", "Courses"], ["mylearning", "My Learning"]].map(([key, label]) => (
          <span key={key} onClick={() => setPage(key)} style={{ fontSize: ".88rem", fontWeight: page === key ? 500 : 400, color: page === key ? "var(--text)" : "var(--text2)", cursor: "pointer", position: "relative" }}>
            {label}
            {key === "mylearning" && enrollCount > 0 && (
              <span style={{ position: "absolute", top: -6, right: -14, background: "var(--terra)", color: "#fff", fontSize: ".55rem", fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{enrollCount}</span>
            )}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div onClick={() => setPage("mylearning")} style={{ display: "flex", alignItems: "center", gap: ".4rem", fontSize: ".88rem", color: "var(--text2)", cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
          Dashboard
        </div>
        <Btn onClick={() => setPage("courses")} style={{ padding: ".5rem 1.2rem", fontSize: ".85rem" }}>Start Learning</Btn>
      </div>
    </nav>
  );
}

//  Footer 
function Footer() {
  return (
    <footer style={{ background: "var(--cream)", borderTop: "1px solid var(--border)", padding: "3rem 2.5rem 2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(3,1fr)", gap: "3rem", marginBottom: "2rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem", fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 600, marginBottom: ".75rem" }}>
            <img src={LOGO_SRC} alt="" style={{ width: 22, height: 22, objectFit: "contain", borderRadius: 3 }} />
            YouLearn
          </div>
          <p style={{ fontSize: ".82rem", color: "var(--text3)", lineHeight: 1.55 }}>Expert-led courses on crypto, forex, trading, and personal finance.</p>
        </div>
        {[["Learn", ["All Courses", "My Learning"]], ["Community", ["Blog", "Forum"]], ["Company", ["About", "Contact", "Privacy"]]].map(([section, links]) => (
          <div key={section}>
            <h4 style={{ fontSize: ".82rem", fontWeight: 600, marginBottom: ".75rem" }}>{section}</h4>
            {links.map((l) => <div key={l} style={{ fontSize: ".82rem", color: "var(--text3)", marginBottom: ".5rem", cursor: "pointer" }}>{l}</div>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", fontSize: ".78rem", color: "var(--text3)" }}>
        © 2026 YouLearn. All rights reserved.
      </div>
    </footer>
  );
}

//  Home Page 
function LearningPathCard({ path, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "var(--cream)" : "var(--white)", padding: "2rem 1.75rem", cursor: "pointer", transition: "background .18s" }}>
      <div style={{ fontSize: "2.2rem", marginBottom: "1.25rem" }}>{path.emoji}</div>
      <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 600, marginBottom: ".25rem" }}>{path.name}</div>
      <div style={{ fontSize: ".82rem", color: "var(--text3)" }}>{path.count}</div>
    </div>
  );
}

function HomePage({ setPage, setSelectedCourse, enrollments, getProgress }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 480 }}>
        <div style={{ padding: "4rem 2.5rem 3rem" }}>
          <SectionLabel>Master Finance & Trading</SectionLabel>
          <h1 style={{ color: "var(--text1)", fontFamily: "var(--serif)", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1rem", letterSpacing: "-.01em",}}>
            Master Finance, Crypto & Trading
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--text2)", lineHeight: 1.65, maxWidth: "32rem", marginBottom: "2rem" }}>
            Join 24,000+ learners mastering cryptocurrency, forex trading, stock investing, and personal finance through expert-crafted courses.
          </p>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
            <Btn onClick={() => setPage("courses")}>Explore Courses →</Btn>
            <Btn variant="secondary" onClick={() => setPage("mylearning")}>▶ My Dashboard</Btn>
          </div>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            {[["180+", "Courses"], ["64", "Instructors"], ["4.8", "Avg. Rating"]].map(([val, lbl]) => (
              <div key={lbl}>
                <span style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 600, display: "block", marginBottom: ".15rem" }}>{val}</span>
                <span style={{ fontSize: ".78rem", color: "var(--text3)" }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", minHeight: 480 }}>
          <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80&fit=crop" alt="Finance trading"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", minHeight: 480 }}
            onError={(e) => { e.target.parentElement.style.background = "#2d4a2d"; e.target.style.display = "none"; }} />
        </div>
      </div>

      {/* Banner */}
      <div style={{ width: "100%", height: 280, overflow: "hidden", position: "relative" }}>
        <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1400&q=80&fit=crop" alt="Financial markets"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
          onError={(e) => (e.target.style.display = "none")} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,.55),rgba(0,0,0,.2) 60%,transparent)", display: "flex", alignItems: "center", padding: "0 2.5rem" }}>
          <div>
            <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.75)", marginBottom: ".5rem" }}>250+ Courses</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.4rem,3vw,2.2rem)", color: "#fff", fontWeight: 700, lineHeight: 1.2, maxWidth: "30rem" }}>
              Start your journey to financial independence
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div style={{ padding: "4rem 2.5rem", background: "var(--white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <SectionLabel>Browse by Topic</SectionLabel>
        <SectionTitle style={{ marginBottom: "2rem" }}>Find your path</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--rl)", overflow: "hidden" }}>
          {LEARNING_PATHS.map((path) => (
            <LearningPathCard key={path.name} path={path} onClick={() => setPage("courses")} />
          ))}
        </div>
      </div>

      {/* Featured Courses */}
      <div style={{ padding: "4rem 2.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
          <div>
            <SectionLabel>Featured Courses</SectionLabel>
            <SectionTitle>Popular right now</SectionTitle>
          </div>
          <button onClick={() => setPage("courses")} style={{ fontSize: ".83rem", color: "var(--text2)", border: "1px solid var(--border)", padding: ".4rem .9rem", borderRadius: "var(--r)", cursor: "pointer", background: "var(--white)" }}>
            View all courses
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--rl)", overflow: "hidden" }}>
          {COURSES.slice(0, 4).map((course) => (
            <CourseCard key={course.id} course={course} enrolled={!!enrollments[course.id]} progress={getProgress(course)}
              onClick={() => { setSelectedCourse(course.id); setPage("detail"); }} />
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "4rem 2.5rem", background: "var(--white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <SectionLabel>What Learners Say</SectionLabel>
        <SectionTitle style={{ marginBottom: "2rem" }}>Stories from our community</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.initials} style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--rl)", padding: "1.5rem" }}>
              <p style={{ fontSize: ".88rem", color: "var(--text2)", lineHeight: 1.65, marginBottom: "1.25rem", fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--terra-light)", border: "1px solid var(--terra-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".72rem", fontWeight: 600, color: "var(--terra)", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: ".85rem", fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: ".75rem", color: "var(--text3)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "4rem 2.5rem", background: "var(--cream2)", borderTop: "1px solid var(--border)" }}>
        <h2 style={{color: "var(--text1)", fontFamily: "var(--serif)", fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 700, marginBottom: "1rem", letterSpacing: "-.01em" }}>
          Ready to take control of your finances?
        </h2>
        <p style={{ fontSize: ".95rem", color: "var(--text2)", maxWidth: "36rem", margin: "0 auto 2rem" }}>
          Join thousands of traders, investors, and financial learners growing their wealth every day. Your first course is free.
        </p>
        <div style={{ display: "flex", gap: ".75rem", justifyContent: "center" }}>
          <Btn onClick={() => setPage("courses")}>Get Started Free →</Btn>
          <Btn variant="secondary" onClick={() => setPage("courses")}>Browse Catalog</Btn>
        </div>
      </div>

      <Footer />
    </div>
  );
}

//  Courses Page
function CoursesPage({ setPage, setSelectedCourse, enrollments, getProgress }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter((c) => {
    const catMatch = filter === "All" || c.category === filter;
    const searchMatch = !search || [c.title, c.instructor, c.category, c.description].some((f) => f.toLowerCase().includes(search.toLowerCase()));
    return catMatch && searchMatch;
  });

  return (
    <div style={{ padding: "2.5rem" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 700, marginBottom: ".3rem", letterSpacing: "-.01em" }}>Explore Courses</h1>
      <p style={{ fontSize: ".88rem", color: "var(--text3)", marginBottom: "2rem" }}>{filtered.length} courses across {new Set(filtered.map((c) => c.category)).size} disciplines</p>

      <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 380 }}>
          <svg style={{ position: "absolute", left: ".9rem", top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--text3)", pointerEvents: "none" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search finance courses or instructors…"
            style={{ width: "100%", background: "var(--white)", border: "1px solid var(--border)", color: "var(--text)", fontSize: ".85rem", padding: ".55rem .9rem .55rem 2.4rem", borderRadius: "var(--r)", outline: "none" }} />
        </div>
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ background: filter === cat ? "var(--terra)" : "var(--white)", color: filter === cat ? "#fff" : "var(--text2)", border: filter === cat ? "1px solid var(--terra)" : "1px solid var(--border)", fontSize: ".82rem", fontWeight: 500, padding: ".42rem .9rem", borderRadius: "99px", cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text3)" }}>
          <div style={{ fontSize: "2rem", marginBottom: ".75rem" }}>🔍</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--text)", marginBottom: ".4rem" }}>No courses found</div>
          <div style={{ fontSize: ".85rem" }}>Try a different filter or search term.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--rl)", overflow: "hidden" }}>
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} enrolled={!!enrollments[course.id]} progress={getProgress(course)}
              onClick={() => { setSelectedCourse(course.id); setPage("detail"); }} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

// Course Detail Page
function CourseDetailPage({ courseId, setPage, setLessonAndPage, enrollments, enroll, getProgress, isDone, showToast }) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return null;

  const enrolled = !!enrollments[courseId];
  const enrollment = enrollments[courseId];
  const progress = getProgress(course);
  const allLessons = getAllLessons(course);

  function handleEnroll() { enroll(courseId); showToast("Enrolled! 🎉"); }

  function handleContinue() {
    const idx = allLessons.findIndex((_, i) => !enrollment?.completedLessons.includes(i));
    setLessonAndPage({ courseId, lessonIdx: idx >= 0 ? idx : 0 });
  }

  function handleLessonClick(globalIdx) {
    if (!enrolled && globalIdx > 0) { showToast("Enroll to unlock all lessons", "gold"); return; }
    if (!enrolled) enroll(courseId);
    setLessonAndPage({ courseId, lessonIdx: globalIdx });
  }

  return (
    <div>
      <button onClick={() => setPage("courses")} style={{ display: "flex", alignItems: "center", gap: ".4rem", fontSize: ".85rem", color: "var(--text2)", padding: "1.25rem 2.5rem", borderBottom: "1px solid var(--border)", background: "var(--white)", width: "100%", cursor: "pointer" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
        All courses
      </button>

      <div style={{ padding: "2.5rem", background: "var(--white)", borderBottom: "1px solid var(--border)" }}>
        <CategoryBadge cat={course.category} />
        <h1 style={{ color: "var(--text1", fontFamily: "var(--serif)", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, marginBottom: ".75rem", lineHeight: 1.2, letterSpacing: "-.01em" }}>{course.title}</h1>
        <p style={{ fontSize: ".9rem", color: "var(--text2)", lineHeight: 1.7, maxWidth: "44rem", marginBottom: "1.5rem" }}>{course.longDesc}</p>
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[["★", `${course.rating} rating`, "var(--gold)"], ["👥", course.students.toLocaleString()], ["⏱", course.duration], ["📖", `${allLessons.length} lessons`]].map(([icon, val, iconColor]) => (
            <span key={val} style={{ fontSize: ".85rem", color: "var(--text2)" }}>
              <span style={{ color: iconColor }}>{icon}</span> <strong>{val}</strong>
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", alignItems: "start" }}>
        {/* Curriculum */}
        <div style={{ padding: "2.5rem", borderRight: "1px solid var(--border)" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Curriculum</h2>
          {course.modules.map((mod, mIdx) => {
            const offset = course.modules.slice(0, mIdx).reduce((s, m) => s + m.lessons.length, 0);
            return (
              <div key={mod.name} style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 700, marginBottom: ".25rem" }}>{mod.name}</div>
                <div style={{ fontSize: ".78rem", color: "var(--text3)", marginBottom: ".75rem" }}>{mod.lessons.length} lesson{mod.lessons.length !== 1 ? "s" : ""}</div>
                {mod.lessons.map((lesson, lIdx) => {
                  const globalIdx = offset + lIdx;
                  const done = isDone(courseId, globalIdx);
                  return (
                    <div key={lesson.title} onClick={() => handleLessonClick(globalIdx)}
                      style={{ display: "flex", alignItems: "flex-start", gap: ".9rem", padding: ".65rem 0", borderBottom: "1px solid var(--cream3)", cursor: "pointer" }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", border: `1.5px solid ${done ? "var(--terra)" : "var(--border2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, background: done ? "var(--terra-light)" : "transparent" }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={done ? "var(--terra)" : "var(--text3)"} strokeWidth="2"><polygon points="5,3 19,12 5,21" /></svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: ".875rem", fontWeight: 500, marginBottom: ".15rem", color: done ? "var(--text3)" : "var(--text)", textDecoration: done ? "line-through" : "none" }}>
                          {lesson.title}{done ? " ✓" : ""}
                        </div>
                        <div style={{ fontSize: ".78rem", color: "var(--text3)" }}>{lesson.desc}</div>
                      </div>
                      <div style={{ fontSize: ".78rem", color: "var(--text3)", flexShrink: 0, marginTop: 2 }}>{lesson.dur}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div style={{ padding: "2rem", position: "sticky", top: 64 }}>
          <div style={{ background: "var(--cream)", border: "1px solid var(--border)", borderRadius: "var(--rl)", padding: "1.5rem", marginBottom: "1.25rem" }}>
            <div style={{ fontSize: ".85rem", color: "var(--text2)", marginBottom: ".35rem" }}>Instructor</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 600, marginBottom: "1.25rem" }}>{course.instructor}</div>

            {enrolled ? (
              <>
                <div style={{ marginBottom: ".75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", marginBottom: ".35rem" }}>
                    <span style={{ color: "var(--text2)" }}>Your progress</span>
                    <span style={{ color: "var(--terra)", fontWeight: 500 }}>{progress}%</span>
                  </div>
                  <ProgressBar pct={progress} height={5} />
                  <div style={{ fontSize: ".72rem", color: "var(--text3)", marginTop: ".3rem" }}>{enrollment?.completedLessons.length}/{allLessons.length} lessons completed</div>
                </div>
                {progress === 100
                  ? <div style={{ textAlign: "center", padding: ".6rem", background: "rgba(45,122,45,.08)", border: "1px solid rgba(45,122,45,.2)", borderRadius: "var(--r)", fontSize: ".85rem", color: "#2d7a2d", marginBottom: ".6rem" }}>🎓 Certificate earned!</div>
                  : <Btn onClick={handleContinue} style={{ width: "100%", justifyContent: "center" }}>Continue Learning →</Btn>
                }
              </>
            ) : (
              <Btn onClick={handleEnroll} style={{ width: "100%", justifyContent: "center" }}>Enroll Now — Free</Btn>
            )}

            {[["Duration", course.duration], ["Lessons", allLessons.length], ["Modules", course.modules.length], ["Level", course.level]].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: ".6rem 0", borderTop: "1px solid var(--cream3)", fontSize: ".85rem" }}>
                <span style={{ color: "var(--text2)" }}>{label}</span>
                <span style={{ fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

//Lesson Player Page 
function LessonPlayerPage({ lessonState, setLessonIdx, goBack, enrollments, isDone, markComplete, enroll, showToast }) {
  const { courseId, lessonIdx } = lessonState;
  const course = COURSES.find((c) => c.id === courseId);
  const allLessons = getAllLessons(course);
  const lesson = allLessons[lessonIdx];
  const done = isDone(courseId, lessonIdx);
  const enrolled = !!enrollments[courseId];
  const enrollment = enrollments[courseId];
  const progress = enrolled ? Math.round((enrollment.completedLessons.length / allLessons.length) * 100) : 0;

  const onVideoComplete = useCallback(() => {
    if (!done) showToast("Lesson finished! Hit mark complete 👇", "gold");
  }, [done, showToast]);

  const { playing, elapsed, pct, togglePlay, seek, reset } = useVideoPlayer({ totalSeconds: parseDuration(lesson?.dur), onComplete: onVideoComplete });

  useEffect(() => { reset(); }, [lessonIdx, reset]);

  const canComplete = pct > 25 || done;

  function handleMarkComplete() { if (!enrolled) enroll(courseId); markComplete(courseId, lessonIdx); showToast("Lesson marked complete! 🎉"); }

  function navigateLesson(idx) {
    if (idx < 0 || idx >= allLessons.length) return;
    if (!enrolled && idx > 0) { showToast("Enroll to unlock all lessons", "gold"); return; }
    setLessonIdx(idx);
  }

  if (!lesson) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", height: 50, background: "var(--white)", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <button onClick={goBack} style={{ display: "flex", alignItems: "center", gap: ".4rem", fontSize: ".82rem", color: "var(--text2)", cursor: "pointer", background: "none", border: "none" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
          {course.title}
        </button>
        <span style={{ fontSize: ".78rem", color: "var(--text3)" }}>Lesson {lessonIdx + 1} of {allLessons.length}</span>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", borderRight: "1px solid var(--border)" }}>
          {/* Video area */}
          <div onClick={togglePlay} style={{ background: course.color, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7rem", opacity: 0.12, userSelect: "none", pointerEvents: "none" }}>📈</div>
            {!playing && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.12)" }}>
                <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", background: "rgba(192,80,58,.92)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", color: "#fff", paddingLeft: 4 }}>▶</div>
              </div>
            )}
            {playing && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: ".75rem" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: "2.8rem" }}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{ width: 5, height: "100%", borderRadius: 3, background: "var(--terra)", transformOrigin: "bottom", opacity: 0.85, animation: `barBounce ${0.6 + (i % 4) * 0.13}s ease-in-out ${i * 0.08}s infinite` }} />
                  ))}
                </div>
                <span style={{ fontSize: ".68rem", letterSpacing: ".1em", color: "rgba(0,0,0,.4)", textTransform: "uppercase" }}>Now Playing</span>
              </div>
            )}
          </div>

          {/* Progress bar (seekable) */}
          <div onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * 100); }}
            style={{ height: 4, background: "var(--cream3)", cursor: "pointer", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: `${pct}%`, background: "var(--terra)", transition: "width .2s linear", pointerEvents: "none" }} />
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: ".65rem 1.4rem", background: "var(--white)", borderBottom: "1px solid var(--border)" }}>
            <button disabled={lessonIdx === 0} onClick={() => navigateLesson(lessonIdx - 1)} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: "1rem", cursor: lessonIdx === 0 ? "default" : "pointer", opacity: lessonIdx === 0 ? 0.3 : 1 }}>⏮</button>
            <button onClick={togglePlay} style={{ background: "none", border: "none", color: "var(--terra)", fontSize: "1.45rem", cursor: "pointer" }}>{playing ? "⏸" : "▶"}</button>
            <button disabled={lessonIdx === allLessons.length - 1} onClick={() => navigateLesson(lessonIdx + 1)} style={{ background: "none", border: "none", color: "var(--text3)", fontSize: "1rem", cursor: lessonIdx === allLessons.length - 1 ? "default" : "pointer", opacity: lessonIdx === allLessons.length - 1 ? 0.3 : 1 }}>⏭</button>
            <span style={{ fontSize: ".72rem", color: "var(--text3)", marginLeft: "auto" }}>{formatTime(elapsed)} / {lesson.dur}</span>
            <button onClick={canComplete && !done ? handleMarkComplete : undefined}
              style={{ fontSize: ".75rem", fontWeight: 500, padding: ".35rem .85rem", borderRadius: 6, cursor: done || !canComplete ? "default" : "pointer", border: `1px solid ${done || canComplete ? "rgba(45,122,45,.3)" : "var(--border)"}`, background: done || canComplete ? "rgba(45,122,45,.08)" : "transparent", color: done || canComplete ? "#2d7a2d" : "var(--text3)", opacity: canComplete || done ? 1 : 0.4 }}>
              {done ? "✓ Completed" : "Mark complete"}
            </button>
          </div>

          {/* Lesson info */}
          <div style={{ padding: "1.5rem" }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, marginBottom: ".5rem", letterSpacing: "-.01em" }}>{lesson.title}</h2>
            <p style={{ fontSize: ".875rem", color: "var(--text2)", lineHeight: 1.65, maxWidth: "50rem" }}>{lesson.desc}</p>
          </div>

          {/* Prev / Next nav */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 1.5rem", borderTop: "1px solid var(--border)" }}>
            <Btn variant="secondary" onClick={() => navigateLesson(lessonIdx - 1)} style={{ opacity: lessonIdx === 0 ? 0.3 : 1, cursor: lessonIdx === 0 ? "default" : "pointer" }}>← Previous</Btn>
            <Btn onClick={() => navigateLesson(lessonIdx + 1)} style={{ opacity: lessonIdx === allLessons.length - 1 ? 0.3 : 1, cursor: lessonIdx === allLessons.length - 1 ? "default" : "pointer" }}>Next lesson →</Btn>
          </div>
        </div>

        {/* Sidebar lesson list */}
        <div style={{ width: 300, flexShrink: 0, overflowY: "auto", background: "var(--white)" }}>
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, background: "var(--white)" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: ".92rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: ".5rem" }}>{course.title}</div>
            <ProgressBar pct={progress} style={{ marginBottom: ".3rem" }} />
            <div style={{ fontSize: ".68rem", color: "var(--terra)" }}>{enrollment?.completedLessons.length ?? 0}/{allLessons.length} lessons · {progress}%</div>
          </div>
          {allLessons.map((l, i) => {
            const lDone = isDone(courseId, i);
            const isCurrent = i === lessonIdx;
            const locked = !enrolled && i > 0;
            return (
              <div key={i} onClick={() => navigateLesson(i)}
                style={{ display: "flex", alignItems: "center", gap: ".75rem", padding: ".8rem 1.25rem", borderBottom: "1px solid var(--cream3)", cursor: locked ? "default" : "pointer", background: isCurrent ? "var(--terra-light)" : "var(--white)", borderLeft: isCurrent ? "3px solid var(--terra)" : "3px solid transparent", paddingLeft: isCurrent ? "calc(1.25rem - 3px)" : "1.25rem", opacity: locked ? 0.35 : 1, transition: "background .16s" }}>
                <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: lDone ? "var(--terra)" : "var(--cream2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".62rem", color: lDone ? "#fff" : "var(--text3)", border: `1px solid ${lDone ? "var(--terra)" : "var(--border)"}`, flexShrink: 0 }}>
                  {lDone ? "✓" : i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: ".78rem", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: ".1rem" }}>{l.title}</div>
                  <div style={{ fontSize: ".65rem", color: "var(--text3)" }}>{l.dur}{locked ? " · 🔒" : ""}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

//My Learning Page 
function MyLearningPage({ setPage, setSelectedCourse, setLessonAndPage, enrollments, getProgress, isDone }) {
  const enrolledIds = Object.keys(enrollments);
  const totalLessonsDone = enrolledIds.reduce((s, id) => s + enrollments[id].completedLessons.length, 0);
  const completedCourses = enrolledIds.filter((id) => { const c = COURSES.find((c) => c.id === id); return c && getProgress(c) === 100; }).length;

  const COURSE_ICONS = ["📖", "💻", "📊", "📈", "💰", "🐍"];

  return (
    <div style={{ padding: "2.5rem", maxWidth: 900 }}>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 700, marginBottom: ".3rem", letterSpacing: "-.01em" }}>My Learning</h1>
      <p style={{ fontSize: ".88rem", color: "var(--text3)", marginBottom: "2rem" }}>Track your progress and continue where you left off.</p>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
        {[{ icon: <img src={LOGO_SRC} alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />, val: enrolledIds.length, lbl: "Enrolled" },
          { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--terra)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16" /></svg>, val: totalLessonsDone, lbl: "Lessons done" },
          { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--terra)" strokeWidth="2"><path d="M8 21h8m-4-4v4M12 3a9 9 0 100 14 9 9 0 000-14z" /></svg>, val: completedCourses, lbl: "Completed" },
        ].map(({ icon, val, lbl }) => (
          <div key={lbl} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--rl)", padding: "1.5rem", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: ".5rem" }}>{icon}</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 700, marginBottom: ".2rem" }}>{val}</div>
            <div style={{ fontSize: ".78rem", color: "var(--text3)" }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Enrolled courses */}
      {enrolledIds.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--rl)", color: "var(--text3)" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", opacity: 0.4 }}>
            <img src={LOGO_SRC} alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
          </div>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginBottom: ".5rem" }}>No courses yet</h3>
          <p style={{ fontSize: ".85rem", marginBottom: "1.5rem" }}>Explore our catalog and enroll in your first course.</p>
          <Btn onClick={() => setPage("courses")}>Browse Courses</Btn>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
          {enrolledIds.map((id) => {
            const course = COURSES.find((c) => c.id === id);
            if (!course) return null;
            const progress = getProgress(course);
            const enrollment = enrollments[id];
            const allLessons = getAllLessons(course);
            const done = enrollment.completedLessons.length;
            const status = progress === 100 ? "Complete" : done > 0 ? "In progress" : "Not started";
            const statusColor = progress === 100 ? "#2d7a2d" : done > 0 ? "var(--terra)" : "var(--text3)";
            const statusBg = progress === 100 ? "rgba(45,122,45,.1)" : done > 0 ? "var(--terra-light)" : "var(--cream2)";
            const courseIdx = COURSES.indexOf(course);

            function handleClick() {
              setSelectedCourse(id);
              if (progress === 100) { setPage("detail"); return; }
              const idx = allLessons.findIndex((_, i) => !enrollment.completedLessons.includes(i));
              setLessonAndPage({ courseId: id, lessonIdx: idx >= 0 ? idx : 0 });
            }

            return (
              <div key={id} onClick={handleClick}
                style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--rl)", display: "flex", alignItems: "center", gap: "1.25rem", padding: "1rem 1.25rem", cursor: "pointer", transition: "all .18s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.background = "var(--cream)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--white)"; }}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "var(--r)", background: course.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>
                  {COURSE_ICONS[courseIdx % COURSE_ICONS.length]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: ".95rem", fontWeight: 600, marginBottom: ".15rem" }}>{course.title}</div>
                  <div style={{ fontSize: ".75rem", color: "var(--text3)", marginBottom: ".5rem" }}>by {course.instructor}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".25rem" }}>
                    <div style={{ flex: 1, height: 3, background: "var(--cream3)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress}%`, background: "var(--terra)", borderRadius: 2, transition: "width .5s" }} />
                    </div>
                    <span style={{ fontSize: ".65rem", color: "var(--terra)", minWidth: "2.5rem", textAlign: "right" }}>{progress}%</span>
                  </div>
                  <div style={{ fontSize: ".68rem", color: "var(--text3)" }}>{done} / {allLessons.length} lessons completed</div>
                </div>
                <span style={{ fontSize: ".68rem", padding: ".22rem .55rem", borderRadius: 4, whiteSpace: "nowrap", background: statusBg, color: statusColor }}>{status}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

//  Root App
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessonState, setLessonState] = useState(null);
  const { enrollments, enroll, markComplete, getProgress, isDone } = useEnrollments();
  const { toast, show: showToast } = useToast();

  // Inject global styles once
  useEffect(() => {
    const id = "yl-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = GLOBAL_CSS;
      document.head.appendChild(el);
    }
  }, []);

  const enrollCount = Object.keys(enrollments).length;

  function navigate(p) { setPage(p); window.scrollTo(0, 0); }

  function setLessonAndPage(state) { setLessonState(state); setPage("lesson"); window.scrollTo(0, 0); }

  return (
    <>
      <Navbar page={page} setPage={navigate} enrollCount={enrollCount} />

      {page === "home" && (
        <HomePage setPage={navigate} setSelectedCourse={setSelectedCourse} enrollments={enrollments} getProgress={getProgress} />
      )}
      {page === "courses" && (
        <CoursesPage setPage={navigate} setSelectedCourse={setSelectedCourse} enrollments={enrollments} getProgress={getProgress} />
      )}
      {page === "detail" && selectedCourse && (
        <CourseDetailPage courseId={selectedCourse} setPage={navigate} setLessonAndPage={setLessonAndPage} enrollments={enrollments} enroll={enroll} getProgress={getProgress} isDone={isDone} showToast={showToast} />
      )}
      {page === "lesson" && lessonState && (
        <LessonPlayerPage lessonState={lessonState} setLessonIdx={(idx) => setLessonState((s) => ({ ...s, lessonIdx: idx }))} goBack={() => { navigate("detail"); }} enrollments={enrollments} isDone={isDone} markComplete={markComplete} enroll={enroll} showToast={showToast} />
      )}
      {page === "mylearning" && (
        <MyLearningPage setPage={navigate} setSelectedCourse={setSelectedCourse} setLessonAndPage={setLessonAndPage} enrollments={enrollments} getProgress={getProgress} isDone={isDone} />
      )}

      <Toast toast={toast} />
    </>
  );
}