# How to add a New Post as a contributer;

- First, Clone this repository into your Mac/PC.
- The root directory of this repository contains all the necessary folders for hosting/serving this blog.
- To add a new Post, Goto "contect/post" and simply add a new '.md' file or duplicate the template from other '.md' files 
- These posts follow the simple Markdown File format.(Check out the Markdown File Cheatsheet to know more!)

- To add a new Author, under 'content/Authors', add a new file 'XYZ.md', where you just substitute XYZ with your name. The file should contain the following:
        ---
        title: XYZ
        bio: |
        xoxo
        avatar: /images/myphoto.jpeg
        date: 2001-10-10
        featured: true
        social:
        - title: github
            url: https://github.com/mk210/Tech-Club-Blog
        - title: instagram
            url: https://www.instagram.com/
        - title: linkedin
            url: https://www.linkedin.com/
        ---
    To add your name as an author in you post, simply edit the "authors: hugo-authors/XYZ", by substituting XYZ as the name of your file which you have created earlier. That should do the job. Play around with this page to know more.

- To add a new Image in your post, First, place the photo in "static/images" and then write the file destination in "hero: /images/XYZ.jpg" by replacing XYZ.jpg as the photo you have placed in the folder.in order to add a new Photo in between the post, the syntax is ![Example image](/static/image.png)

- Play around with Hugo first to learn more and don't forget to refer the cheat sheet. 
So, That's the manual for a contributer.