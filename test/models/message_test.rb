# == Schema Information
#
# Table name: messages
#
#  id              :bigint(8)        not null, primary key
#  text            :string           not null
#  conversation_id :integer          not null
#  user_id         :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
