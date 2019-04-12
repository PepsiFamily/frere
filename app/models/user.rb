class User < ApplicationRecord
    validates :email, :username, presence: true
    validates :password_digest, :session_token, presence: true
    validates :email, uniqueness: { message: " - Email has been taken"}
    validates :password, length: { minimum: 6, allow_nil: true }

    after_initialize :ensure_session_token!

    has_many :servers,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :Server

    attr_reader :password

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user && user.is_password?(password) ? user : nil
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def ensure_session_token!
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end
end