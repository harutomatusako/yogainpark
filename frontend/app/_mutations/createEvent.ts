// Rails APIのエンドポイント
const railsApiEndpoint = "http://localhost:3000/events";

export const createEvent = async (props:any) => {
  try {
    const data = {
      name: props.name,
      description: props.description,
      location: props.location,
      prefecture: props.prefecture,
      date: props.date,
      organizer: props.organizer,
      createdAt: new Date(),
      user_id: 2,
      participant_ids: []
    };

    alert("イベントを作成！")

    // Rails APIにデータを送信
    const response = await fetch(railsApiEndpoint, {
      method: "POST",
      mode:"cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // レスポンスをログに出力
    console.log(response);

  } catch (err) {
    console.error(err);
  }
};
