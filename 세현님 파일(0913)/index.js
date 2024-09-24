<html
  key="1"
  lang="en"
>
  <head>
    <meta charSet="UTF-8" />
    <meta
      content="width=device-width, initial-scale=1.0"
      name="viewport"
    />
    <title>
      예약 팝업 창
    </title>
    <link
      href="index.css"
      rel="stylesheet"
    />
    <script
      crossOrigin="anonymous"
      src="https://kit.fontawesome.com/f5d8dacc3c.js"
    />
  </head>
  <body>
    <div className="overlay">
      <div className="box">
        <button className="fa-solid fa-x" />
        <p>
          이비인후과
          <br />
          <i className="fa-solid fa-circle" />
          <span className="name">
            오비오이비인후과의원
          </span>
        </p>
        <p>
          예약 날짜{' '}
          <span className="date">
            2024.09.09
          </span>
        </p>
        <br />
        <p>
          예약 시간
        </p>
        <p>
          오전
          <br />
          <button className="time-slot">
            09:00
          </button>
          <button className="time-slot">
            09:30
          </button>
          <button className="time-slot">
            10:00
          </button>
          <button className="time-slot">
            10:30
          </button>
          <button className="time-slot">
            11:00
          </button>
          <br />
          <button className="time-slot">
            11:30
          </button>
          <button className="time-slot">
            12:00
          </button>
          <button className="time-slot">
            13:00
          </button>
          <button className="time-slot">
            13:30
          </button>
          <button className="time-slot">
            14:00
          </button>
        </p>
        <p>
          오후
          <br />
          <button className="time-slot">
            14:30
          </button>
          <button className="time-slot">
            15:00
          </button>
          <button className="time-slot">
            15:30
          </button>
          <button className="time-slot">
            16:00
          </button>
          <button className="time-slot">
            16:30
          </button>
          <br />
          <button className="time-slot">
            17:00
          </button>
          <button className="time-slot">
            17:30
          </button>
          <button className="time-slot">
            18:00
          </button>
          <button className="time-slot">
            18:30
          </button>
          <button className="time-slot">
            19:00
          </button>
          <br />
          <button className="time-slot">
            19:30
          </button>
          <button className="time-slot">
            20:00
          </button>
        </p>
        <br />
        <button className="save">
          저장하기
        </button>
      </div>
    </div>
  </body>
</html>