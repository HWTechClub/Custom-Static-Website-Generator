+++
date="2020"
title="Drop in your suggestions"
+++
<form method="post" name="Contact" netlify>
    <label>Name <input type="text" name="name"></label>
    <label>Email <input type="email" name="email"></label>
    <label for="message">Message</label>
    <textarea id="message" name ="message" placeholder="Write something here!" style="height:200px"></textarea>
    <button type="submit">Send</button>
    <br>
    <div data-netlify-recaptcha></div>
</form>