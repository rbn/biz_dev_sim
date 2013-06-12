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

# sample questions
Stage.all.each do |s| 
  q = Question.new
  q.text = "Since this is your first meeting with this prospective client, what should be themost important objective of the meeting?"
  q.answers = '{ "1": { "text" : "Determining whether or not the client has money for this working" }, "2" : { "text" : "Making sure the client knows what particular products and services your firm offers", "correct" : "true"}, "3" : { "text" : "Finding out who and how decisions are made by the client’s Division at his/her Agency" }, "4" : { "text" : "Establishing a rapport with the client to facilitate future contact" }, "5" : { "text" : "Gaining a thorough understanding of the client’s requirements" }  }'
  q.explanation = %*All of these possible answers have merit, but the best answer is 4, “Establishing a rapport…” What you’re really after in this first meeting is the second meeting.  The ideal outcome of the first meeting is a mutual sense that you and your prospective client can establish a productive, downstream working relationship.  Remember, this business is not a quick sale and a walk-away.  You’re trying a to establish a long-term, mutually beneficial relationship.  Your potential client is also sizing you up during the meeting:  “Can I work with this person?  Are they really making an effort to understand my requirement? …Etc.” The other possible answers are also very important, but this kind of information will likely evolve from futurecontact with your prospective client.  If you don’t establish a reasonable rapport with the client in the first meeting (“first base” if you will), it’s unlikely you’ll ever make it to “second base.”*
  s.questions.push(q)
  s.save
end
