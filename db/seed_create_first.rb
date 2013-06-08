#! encoding: utf-8

def build_standard(stage)
  stage.featured_image_url = 'swag/phone1.jpg'
  stage.featured_text = %*<p>Your prospective client has agreed to see you to discuss her requirements.  While the prospective client, Gail Smith, has not worked with your firm, she believes your firm may have some of the experience and skills she needs.  
  </p>
  <p>
  To help you prepare for your first in-person meeting with her, please read the “best-practices in conducting marketing calls.” To access this material, go to the “Intellectual Capital” drop down list on the Dashboard, and click on the “Marketing Calls” item on the list.    Please read the material and then answer the five (multiple choice) questions that appear in the “Questions” drop-down list on the Dashboard. 
  </p>
  <p> 
  When you click on “Marketing Call Questions” you will see a series of five questions.  For each question, click on the box that you believe provides the best answer.  You get one point for each correct answer (five points total).  Note that you cannot access the questions until after first accessing the appropriate intellectual capital. 
  </p>*
end

def build_video(stage)
  stage.featured_video_url = %*<iframe src="http://player.vimeo.com/video/67854501" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <p><a href="http://vimeo.com/67854501">MelBrooksMarketing</a> from <a href="http://vimeo.com/user18691976">Rich Nyman</a> on <a href="http://vimeo.com">Vimeo</a>.</p>
<input type="hidden" name="stage" value=#{stage.id} />*
end

Stage.all.each_with_index do |s, i|
  s.nexts = [ s.id + 1 ] 
  s.nexts.push(s.id + 3) if i == 1
  s.nexts.push(s.id + 5) if i == 5
  build_standard(s) if i.even?
  build_video(s) if i.odd?
  s.save
end
