class Api::V1::GraphqlProxyController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'net/http'
  require 'uri'

  FLEXHIRE_API_URL = 'https://flexhire.com/api/v2'

  def query
    api_key = request.headers['FLEXHIRE-API-KEY']
    unless api_key.present?
      render json: { error: 'API key is required' }, status: :unauthorized
      return
    end

    uri = URI.parse(FLEXHIRE_API_URL)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(uri.path, { 'Content-Type' => 'application/json', 'FLEXHIRE-API-KEY' => api_key })
    request.body = request.body = params.to_json

    response = http.request(request)

    if response.code == '200'
      render json: JSON.parse(response.body)
    else
      render json: { error: response.body }, status: response.code
    end
  end
end
