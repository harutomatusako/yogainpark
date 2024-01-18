
type Props = {
  email: string;
}

export const createUser = async (props: Props) => {
  try {
    const data = {
      name: props.email,
      email: props.email
    };

    // Rails APIのエンドポイント
    const railsApiEndpoint = "https://rails-production-6d55.up.railway.app/users";

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
