Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:8000','https://yogainpark.up.railway.app' # クライアントのオリジンを設定
    resource '*',
      headers: :any,
      methods: :any
  end
end