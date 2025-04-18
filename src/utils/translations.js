/**
 * @file translation.js
 * @description Contains translations for the website in English, Korean, and Japanese.
 * (English remains unchanged; previous Italian and Polish have been replaced.)
 */

const translations = {
  // ENGLISH <---------------------------------------------------------------------------------------
  en: {
    couple: {
      her: "Tamako",
      him: "Philip",
      footer_her: "Tamako",
      footer_him: "Philip",
    },
    navbar: {
      welcome: "RSVP Form", // Override
      save_the_date: "Photo gallery",
      schedule: "Information",
      info: "Details",
      rsvp: "RSVP",
      registry: "Registry",
      music: "Playlist",
    },
    welcome_section: {
      small_text: "9/21/2025 12:30PM, Hotel Gajoen Tokyo",
      days: "Days",
      day: "Day",
      hours: "Hours",
      hour: "Hour",
      minutes: "Minutes",
      minute: "Minute",
      seconds: "Seconds",
      second: "Second",
      button: "RSVP",
    },
    saveTheDate_section: {
      title: "Celebrate with us",
      title_cursive: "On this day",
      date: "21st of September 2025",
      place: "in Japan, Tokyo",
      story_1: "First date",
      story_2: "Engagement",
      story_3_future: "Marriage",
      story_3_past: "We Got Married",
    },
    schedule_section: {
      title: {
        main: "WEDDING",
        sub: "Timeline",
      },
      description:
        "The wedding celebration will start on Saturday, 26th of July, and end on Sunday, 27th of July 2025.",
      day_1: {
        title: "Day 1",
        events: {
          ceremony: {
            time: "4:00 PM",
            title: "Ceremony Begins",
          },
          dinner: {
            time: "5:00 PM",
            title: "Dinner Served",
          },
          dance: {
            time: "6:00 PM",
            title: "First Dance",
          },
          photo: {
            time: "7:00 - 10:00 PM",
            title: "Photo Booth",
          },
          pig: {
            time: "10:30 PM",
            title: "Special Dish",
          },
          cake_cutting: {
            time: "12:00 AM",
            title: "Cake Cutting",
          },
          games: {
            time: "12:30 AM",
            title: "Party Games",
          },
          party: {
            time: "All Night",
            title: "Eat, Drink, Dance, Repeat!",
          },
        },
      },
      day_2: {
        title: "Day 2",
        events: {
          after: {
            time: "3:00 PM",
            title: "After Party Starts",
          },
          vespa: {
            time: "4:00 - 9:00 PM",
            title: "Vespa Bar",
          },
          party_continues: {
            time: "All Day",
            title: "Eat, Drink, Dance, Repeat!",
          },
          end: {
            time: "10:00 PM",
            title: "The End",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "THE",
        sub: "Details",
      },
      details: {
        when_where: "When & Where",
        dates: [
          {
            bold: true,
            text: "Dates: ",
          },
          "Saturday, 21st of September, 12:00PM",
        ],
        location: [
          {
            bold: true,
            text: "Location: ",
          },
          'Hotel Gajoen Tokyo, 1 Chome-8-1 Shimo Meguro, Meguro City, Tokyo 153-0064, Japan',
        ],
        button_loc:"SEE THE VENUE"
      },
      accommodations: {
        title: "Accommodations",
        description_1: [
          "For our international guests, we are pleased to offer accommodation at the venue's hotel on the ",
          {
            bold: true,
            text: "Friday 25th of July, Saturday 26th of July, and Sunday 27th of July.",
          },
          " If you need accommodation for additional days, please let us know, and we can help you arrange it with the venue.",
        ],
        breakfast: [
          { bold: true, text: "Breakfast" },
          " is included with your stay and will be served from ",
          { bold: true, text: "9 AM to 11 AM" },
          " each morning (this might change, please check the website closer to the wedding date).",
        ],
      },
      travel_transport: {
        title: "Travel & Transportation",
        description_1: [
          "By train, it is three minutes walk from the Meguro Station (on the JR Yamanote Line, Tokyu Meguro Line, Subway Nanboku Line, Mita Line)",
        ],
        description_2: ["By car, it is three minutes drive from the Meguro Ramp on the 2nd Highway"],
        description_3: [
          "There is also free shuttle bus that goes to the hotel from various locations. Please refer to the venue's website for more information.",
        ],
        description_4: [
          "If you need any help with transportation, please let us know. We will do our best to accommodate everyone.",
        ],
      },
      contact: {
        title: "Contact Us",
        email_label: "Email",
        line_label: "Line ID",
        kakao_label: "KakaoTalk ID",
      },
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "Confirm your", sub: "Attendance" },
      description_1: [
        { bold: true, text: "Please RSVP by the 26th of August 2025!" },
      ],
      description_2:
        "Please leave us a note if you have any special requests, dietary restrictions, or if there’s anything else you’d like to discuss. We want to make sure everyone is comfortable and has an amazing time!",
      label: "Search your name in the guests list",
      placeholder: "Search for your name",
      no_found: "No guests found with this name",
      multiple_guests_1: {
        hi: "Hi ",
        you: " You, ",
        and: " and ",
        are_invited:
          ", are warmly invited to join us on our special day. Celebrating with all of you will make it unforgettable!",
      },
      multiple_guests_2:
        "Select who is attending the wedding. We hope all of you can make it.",
      single_guest_1: {
        hi: "Hi ",
        are_invited:
          " you are warmly invited to join us on our special day. Celebrating with you will make it unforgettable!",
      },
      single_guest_2: "Are you attending the wedding?",
      answers: { yes: "Yes", no: "No", unknown: "Don't know yet" },
      note_placeholder: "Would you like to leave a note?",
      rsvp_success: {
        thanks: "Thank you!",
        submitted: " Your RSVP has been submitted.",
        change_by: [
          "Remember that you can change the attendance any time before the ",
          { bold: true, text: "26th of May 2025" },
          ".",
        ],
      },
      error_enter_name: "Please enter your answer before submitting",
      error_submitting: "Error submitting RSVP. Please try again.",
      button: {
        submit: "Send RSVP",
        loading: "Loading...",
      },
    },
    registry_section: {
      title: { main: "GIFT", sub: "Registry" },
      description_1:
        "Your presence at our wedding is truly the greatest gift we could ask for!",
      description_2:
        "However, if you wish to honor us with a gift, we would greatly appreciate a monetary contribution to help us build our future together.",
      description_3:
        "In lieu of flowers, alcohol, and other physical gifts, we would be delighted to receive scratch cards or lottery tickets as a fun and exciting way to celebrate our new beginning.",
      description_4:
        "We kindly ask our international guests to consider sending their gift via a bank transfer. To access our bank details, please click the button below and enter the password that’s on your invitation. As always, feel free to contact us directly if you have any questions!",
      button: "Access Bank Details",
      thanks: "THANK YOU!",
      error_from_api: "There is a problem. Try again later or contact us",
      error_incorrect_password: "Incorrect password",
      error_insert_password: "Insert password",
      account_holder: "Beneficiary: ",
      iban: "IBAN: ",
      bank_name: "Bank address: ",
      bic: "BIC / SWIFT: ",
      sort_code: "Sort Code: ",
      account_number: "Account Number: ",
      eur: "Eur",
      gbp: "Pound",
      pln: "Polish Zlotych",
      toast_copied: "Copied to clipboard",
      toast_error: "Couldn't copy it",
      dialog_title: {
        before: "Enter the password",
        after: "The password is correct",
      },
      placeholder: "Enter password",
      submit_button: { submit: "Submit", loading: "Checking..." },
      copy_all: "Copy All",
    },
    music_section: {
      title: { main: "OUR", sub: "Playlist" },
      description:
        "Add your favorite party songs to our playlist and help us shape the perfect soundtrack for our wedding! ",
      placeholder: "Enter the song name",
      small_note:
        "* Some songs can't be played here, but you can still add them to the playlist.",
      toast_success: {
        title: "Song added to the playlist",
        description: "Would you like to add another song?",
      },
      toast_error: {
        title: "Unable to add the song",
        description:
          "We're sorry, but something went wrong on our end. Please try again later.",
      },
    },
    footer: {
      text_1: "Website created with ",
      text_2: "by ",
    },
    not_found: {
      message: "The page you are looking for does not exist.",
      button: "Go Back",
    },
  },

  // KOREAN <---------------------------------------------------------------------------------------
  ko: {
    couple: {
      her: "Tamako",
      him: "Philip",
      footer_her: "Tamako",
      footer_him: "Philip",
    },
    navbar: {
      welcome: "참석 확인",
      save_the_date: "갤러리",
      schedule: "웨딩 타임라인",
      info: "세부 정보",
      rsvp: "RSVP",
      registry: "선물 목록",
      music: "플레이리스트",
    },
    welcome_section: {
      small_text: "2025/9/21 오후 12시, 호텔 가조엔 도쿄",
      days: "일",
      day: "일",
      hours: "시간",
      hour: "시간",
      minutes: "분",
      minute: "분",
      seconds: "초",
      second: "초",
      button: "참석 확인",
    },
    saveTheDate_section: {
      title: "같이 축복해 주세요",
      title_cursive: "저희와",
      date: "2025년 9월 21일",
      place: "일본, 도쿄에서",
      story_1: "첫 데이트",
      story_2: "약혼",
      story_3_future: "결혼식",
      story_3_past: "우리는 결혼했습니다",
    },
    schedule_section: {
      title: {
        main: "웨딩",
        sub: "타임라인",
      },
      description:
        "웨딩 행사는 2025년 7월 26일 토요일에 시작하여 2025년 7월 27일 일요일에 종료됩니다.",
      day_1: {
        title: "1일차",
        events: {
          ceremony: {
            time: "오후 4:00",
            title: "결혼식 시작",
          },
          dinner: {
            time: "오후 5:00",
            title: "만찬",
          },
          dance: {
            time: "오후 6:00",
            title: "첫 댄스",
          },
          photo: {
            time: "오후 7:00 - 10:00",
            title: "포토 부스",
          },
          pig: {
            time: "오후 10:30",
            title: "특별 요리",
          },
          cake_cutting: {
            time: "자정",
            title: "케이크 커팅",
          },
          games: {
            time: "새벽 12:30",
            title: "파티 게임",
          },
          party: {
            time: "밤새",
            title: "먹고, 마시고, 춤추고, 즐기자!",
          },
        },
      },
      day_2: {
        title: "2일차",
        events: {
          after: {
            time: "오후 3:00",
            title: "애프터 파티 시작",
          },
          vespa: {
            time: "오후 4:00 - 9:00",
            title: "베스파 바",
          },
          party_continues: {
            time: "하루 종일",
            title: "먹고, 마시고, 춤추고, 즐기자!",
          },
          end: {
            time: "오후 10:00",
            title: "마무리",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "세부",
        sub: "정보",
      },
      details: {
        when_where: "시간 및 장소",
        dates: [
          {
            bold: true,
            text: "날짜: ",
          },
          "2025년 7월 26일 & 2025년 7월 27일",
        ],
        location: [
          {
            bold: true,
            text: "장소: ",
          },
          '호텔 가조엔, 일본 도쿄 메구로구 시모메구로 1-8-1',
        ],
        button_loc:"장소 보기"
      },
      accommodations: {
        title: "숙박",
        description_1: [
          "국제 손님을 위해, 7월 25일 금요일, 7월 26일 토요일, 7월 27일 일요일에 숙박을 제공합니다.",
        ],
        breakfast: [
          { bold: true, text: "조식" },
          "은 숙박에 포함되며 매일 ",
          { bold: true, text: "오전 9시부터 11시까지" },
          " 제공됩니다.",
        ],
      },
      // KOREAN
    travel_transport: {
      title: "교통편",
      description_1: [
        "전철을 이용하실 경우 JR야마노테선, 도큐 메구로선, 지하철 난보쿠선, 미타선이 지나는 메구로역에서 도보로 3분 거리에 있습니다.",
      ],
      description_2: [
        "자동차로는 제2고속도로 메구로 램프에서 차로 3분 거리입니다.",
      ],
      description_3: [
        "여러 장소에서 호텔로 운행하는 무료 셔틀 버스가 있습니다. 자세한 내용은 행사장 웹사이트를 참조하세요.",
      ],
      description_4: [
        "교통과 관련하여 도움이 필요하시다면 연락주세요. 모든 분을 수용할 수 있도록 최선을 다하겠습니다.",
      ],
    },
      contact: {
        title: "문의하기",
        email_label: "이메일",
        line_label: "라인 ID",
        kakao_label: "카카오톡 ID",
      },
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "참석", sub: "확인" },
      description_1: [
        {
          bold: true,
          text: "2025년 8월 26일 전까지 참석 여부를 확인해주세요!",
        },
      ],
      description_2:
        "특별한 요청이나 식단 제한이 있다면 메시지를 남겨주세요. 모두가 편안하게 즐길 수 있도록 준비하겠습니다.",
      label: "게스트 리스트에서 이름을 검색하세요",
      placeholder: "이름 입력",
      no_found: "해당 이름의 게스트를 찾을 수 없습니다",
      multiple_guests_1: {
        hi: "안녕하세요 ",
        you: "님, ",
        and: " 그리고 ",
        are_invited:
          " 여러분은 특별한 날에 초대되었습니다. 함께 축하하면 잊지 못할 추억이 될 것입니다!",
      },
      multiple_guests_2:
        "참석할 사람을 선택하세요. 모두가 함께 하길 바랍니다.",
      single_guest_1: {
        hi: "안녕하세요 ",
        are_invited:
          "님, 당신은 저희 특별한 날에 초대되었습니다. 함께하면 더욱 뜻깊은 날이 될 것입니다!",
      },
      single_guest_2: "결혼식에 참석하시겠습니까?",
      answers: { yes: "예", no: "아니오", unknown: "미정" },
      note_placeholder: "메시지를 남기시겠습니까?",
      rsvp_success: {
        thanks: "감사합니다!",
        submitted: " 당신의 참석 확인이 전송되었습니다.",
        change_by: [
          "2025년 5월 26일 전까지 참석 여부를 변경할 수 있습니다.",
        ],
      },
      error_enter_name: "참석 여부를 입력해주세요",
      error_submitting: "RSVP 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
      button: {
        submit: "참석 확인",
        loading: "잠시만 기다려주세요...",
      },
    },
    registry_section: {
      title: { main: "선물", sub: "리스트" },
      description_1: "결혼식에 참석하시는 것 자체가 최고의 선물입니다!",
      description_2:
        "하지만 만약 선물을 준비하고 싶으시다면, 저희의 미래를 위한 금전적 지원에 감사드립니다.",
      description_3:
        "꽃, 술 등 물리적인 선물 대신 스크래치 카드나 복권을 선물해주셔도 좋습니다.",
      description_4:
        "해외 고객님께서는 은행 송금을 통해 선물을 보내주시길 부탁드립니다. 아래 버튼을 눌러 초대장에 있는 비밀번호를 입력해주세요. 문의 사항이 있으시면 직접 연락 부탁드립니다.",
      button: "은행 정보 보기",
      thanks: "감사합니다!",
      error_from_api: "문제가 발생했습니다. 나중에 다시 시도해주세요.",
      error_incorrect_password: "비밀번호가 틀렸습니다",
      error_insert_password: "비밀번호를 입력해주세요",
      account_holder: "수취인: ",
      iban: "IBAN: ",
      bank_name: "은행 주소: ",
      bic: "BIC / SWIFT: ",
      sort_code: "Sort Code: ",
      account_number: "계좌 번호: ",
      eur: "유로",
      gbp: "파운드",
      pln: "폴란드 즈워티",
      toast_copied: "클립보드에 복사됨",
      toast_error: "복사에 실패했습니다",
      dialog_title: {
        before: "비밀번호를 입력하세요",
        after: "비밀번호가 올바릅니다",
      },
      placeholder: "비밀번호 입력",
      submit_button: { submit: "전송", loading: "확인 중..." },
      copy_all: "전체 복사",
    },
    music_section: {
      title: { main: "우리의", sub: "플레이리스트" },
      description:
        "결혼식을 위한 완벽한 사운드트랙을 만들기 위해 좋아하는 노래를 추가해주세요!",
      placeholder: "노래 제목 입력",
      small_note:
        "* 일부 노래는 재생되지 않을 수 있지만, 추가는 가능합니다.",
      toast_success: {
        title: "노래가 추가되었습니다",
        description: "다른 노래도 추가하시겠습니까?",
      },
      toast_error: {
        title: "노래 추가에 실패했습니다",
        description:
          "죄송합니다, 문제가 발생했습니다. 나중에 다시 시도해주세요.",
      },
    },
    footer: {
      text_1: "웹사이트 제작: ",
      text_2: "by ",
      text_3: "사진 제공:",
    },
    not_found: {
      message: "찾으시는 페이지가 존재하지 않습니다.",
      button: "돌아가기",
    },
  },

  // JAPANESE <---------------------------------------------------------------------------------------
  ja: {
    couple: {
      her: "Tamako",
      him: "Philip",
      footer_her: "Tamako",
      footer_him: "Philip",
    },
    navbar: {
      welcome: "結婚式出欠", // override
      save_the_date: "ギャラリー",
      schedule: "結婚式タイムライン",
      info: "詳細",
      rsvp: "出欠確認",
      registry: "ギフトリスト",
      music: "プレイリスト",
    },
    welcome_section: {
      small_text: "2025/9/21 午後12時 ホテル雅叙園東京",
      days: "日",
      day: "日",
      hours: "時間",
      hour: "時間",
      minutes: "分",
      minute: "分",
      seconds: "秒",
      second: "秒",
      button: "出欠確認",
    },
    saveTheDate_section: {
      title: "一緒にお祝いしましょう",
      title_cursive: "この日に",
      date: "2025年9月21日",
      place: "日本、東京で",
      story_1: "初デート",
      story_2: "婚約",
      story_3_future: "結婚",
      story_3_past: "私たちは結婚しました",
    },
    schedule_section: {
      title: {
        main: "結婚式",
        sub: "タイムライン",
      },
      description:
        "結婚式は2025年7月26日（土）に始まり、2025年7月27日（日）に終了します。",
      day_1: {
        title: "1日目",
        events: {
          ceremony: {
            time: "16:00",
            title: "挙式開始",
          },
          dinner: {
            time: "17:00",
            title: "ディナー",
          },
          dance: {
            time: "18:00",
            title: "ファーストダンス",
          },
          photo: {
            time: "19:00 - 22:00",
            title: "フォトブース",
          },
          pig: {
            time: "22:30",
            title: "スペシャルディッシュ",
          },
          cake_cutting: {
            time: "0:00",
            title: "ケーキカット",
          },
          games: {
            time: "0:30",
            title: "パーティーゲーム",
          },
          party: {
            time: "一晩中",
            title: "食べて、飲んで、踊って、繰り返そう！",
          },
        },
      },
      day_2: {
        title: "2日目",
        events: {
          after: {
            time: "15:00",
            title: "アフターパーティ開始",
          },
          vespa: {
            time: "16:00 - 21:00",
            title: "ヴェスパバー",
          },
          party_continues: {
            time: "終日",
            title: "食べて、飲んで、踊って、繰り返そう！",
          },
          end: {
            time: "22:00",
            title: "終了",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "詳細",
        sub: "情報",
      },
      details: {
        when_where: "日時・場所",
        dates: [
          {
            bold: true,
            text: "日付: ",
          },
          "2025年7月26日（土） & 2025年7月27日（日）",
        ],
        location: [
          {
            bold: true,
            text: "場所: ",
          },
          'ホテル雅叙園東京, 日本、〒153-0064 東京都目黒区下目黒１丁目８−１',
        ],
        button_loc:"会場を見る"
      },
      accommodations: {
        title: "宿泊施設",
        description_1: [
          "海外のお客様のために、2025年7月25日（金）、7月26日（土）、7月27日（日）に会場のホテルで宿泊をご用意しています。追加宿泊が必要な場合はお知らせください。",
        ],
        breakfast: [
          { bold: true, text: "朝食" },
          "は宿泊に含まれており、毎朝",
          { bold: true, text: "9時から11時まで" },
          "提供されます。",
        ],
      },
      // JAPANESE
    travel_transport: {
      title: "交通手段",
      description_1: [
        "電車をご利用の場合、JR山手線・東急目黒線・地下鉄南北線・三田線の目黒駅から徒歩3分です。",
      ],
      description_2: [
        "お車の場合は第二京浜道路の目黒ランプから車で3分です。",
      ],
      description_3: [
        "また、さまざまな場所からホテルへの無料シャトルバスも運行しています。詳細は会場のウェブサイトをご覧ください。",
      ],
      description_4: [
        "交通手段についてご不明な点があればお知らせください。できる限り対応いたします。",
      ],
    },
      contact: {
        title: "お問い合わせ",
        email_label: "メール",
        line_label: "ライン ID",
        kakao_label: "カカオトーク ID",
      },
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "出欠", sub: "確認" },
      description_1: [
        {
          bold: true,
          text: "2025年8月26日までに出欠を確認してください！",
        },
      ],
      description_2:
        "特別なリクエストや食事制限がある場合はメッセージを残してください。皆様に快適にお過ごしいただくための準備をいたします。",
      label: "ゲストリストからお名前を検索してください",
      placeholder: "お名前を入力してください",
      no_found: "該当するゲストが見つかりませんでした",
      multiple_guests_1: {
        hi: "こんにちは ",
        you: " さん、",
        and: " と ",
        are_invited:
          "は皆様、特別な日にご招待しております。一緒に祝えば忘れられない一日になるでしょう！",
      },
      multiple_guests_2:
        "出席される方を選んでください。皆様のご参加をお待ちしております。",
      single_guest_1: {
        hi: "こんにちは",
        are_invited:
          " さん、あなたは私たちの特別な日にご招待されています。ご一緒できることを楽しみにしています！",
      },
      single_guest_2: "結婚式に出席されますか？",
      answers: { yes: "はい", no: "いいえ", unknown: "未定" },
      note_placeholder: "メッセージを残しますか？",
      rsvp_success: {
        thanks: "ありがとうございます！",
        submitted: " 出欠確認が送信されました。",
        change_by: [
          "2025年5月26日までに出欠の変更が可能です。",
        ],
      },
      error_enter_name: "送信前に出欠を入力してください",
      error_submitting: "RSVP送信中にエラーが発生しました。再度お試しください。",
      button: {
        submit: "出欠を送信",
        loading: "読み込み中...",
      },
    },
    registry_section: {
      title: { main: "ギフト", sub: "リスト" },
      description_1: "ご出席いただくだけで、私たちにとって最高の贈り物です！",
      description_2:
        "もしご厚意でギフトをいただけるなら、私たちの未来への金銭的支援に感謝いたします。",
      description_3:
        "花やアルコールなどの実物贈呈の代わり、スクラッチカードや抽選券でお祝いしていただければ幸いです。",
      description_4:
        "海外からのお客様は、銀行振込でのご送付をお願いいたします。以下のボタンを押して招待状に記載のパスワードを入力してください。ご不明な点があれば、お気軽にお問い合わせください。",
      button: "銀行情報を見る",
      thanks: "ありがとうございます！",
      error_from_api: "問題が発生しました。後ほど再試行してください。",
      error_incorrect_password: "パスワードが正しくありません",
      error_insert_password: "パスワードを入力してください",
      account_holder: "受取人: ",
      iban: "IBAN: ",
      bank_name: "銀行住所: ",
      bic: "BIC / SWIFT: ",
      sort_code: "Sort Code: ",
      account_number: "口座番号: ",
      eur: "ユーロ",
      gbp: "ポンド",
      pln: "ポーランドズウォティ",
      toast_copied: "クリップボードにコピーされました",
      toast_error: "コピーに失敗しました",
      dialog_title: {
        before: "パスワードを入力してください",
        after: "パスワードが正しいです",
      },
      placeholder: "パスワードを入力",
      submit_button: { submit: "送信", loading: "確認中..." },
      copy_all: "すべてコピー",
    },
    music_section: {
      title: { main: "私たちの", sub: "プレイリスト" },
      description:
        "結婚式の完璧なサウンドトラックを作るために、お好きな曲を追加してください！",
      placeholder: "曲名を入力",
      small_note:
        "* 一部の曲は再生できない場合がありますが、追加は可能です。",
      toast_success: {
        title: "曲が追加されました",
        description: "他の曲も追加しますか？",
      },
      toast_error: {
        title: "曲の追加に失敗しました",
        description:
          "申し訳ありません。問題が発生しました。後ほど再試行してください。",
      },
    },
    footer: {
      text_1: "ウェブサイト制作 ",
      text_2: "by ",
      text_3: "Photos by",
    },
    not_found: {
      message: "お探しのページは存在しません。",
      button: "戻る",
    },
  },
};

export default translations;
