# Crudworld

Inventory application project for the Odin Project.

---Devlog---

September 5th, 2022

    Started some basic work on this yesterday. Mostly just following along with the MDN express tutorial, and trimming unnecessary things.

    Basically I just need to make an app where you can create, read, update and delete data, which sounds pretty straightforward. Some of the other projects I saw were pretty uninspired, and most didn't make a lot of sense. Basically databases where anyone can come and change the data seems pretty useless, unless you lean in to it. So my app is a little game with a bunch of tamagotchi type duded that just live their lives, but anyone at anytime can kill or birth new ones. Depending on the time I wanna spend on this, I may also add player submitted items, which would be a system very similar to the vector art style of COD custom tags or whatever those were.

    I'm also considering having mild simulation elements here, but I'm really not sure how confident I am with express yet, so we will see how hard all this shit is.

    "I know" by Girls Rituals is the song of the day. Play that to get a perfect mood for this app. Fuck, maybe I'll embed it.


September 6th, 2022

    Made some good progress yesterday, but had a lot of work ahead of me today. Lots and lots to learn in terms of node, express, pug, mongodb and mongoose, but as usual with programming, it does exactly what you tell it to. Once I've got a better grasp on how all this works, it'll really open up some massive possibilities. 

    Already within an hour and a half I've got the ability to add and delete cruddies done, which is techically half of the battle anyway. If this keeps going smoothly, I'll probably add various worlds for cruddies to live in, as I believe several categories is part of the outline TOP gives.

    Trying to just delete cruddies from within worlds, and this is proving to be a right nightmare.

September 7th, 2022

    This project is such a mess, but it is sorta working as intended now, which is sick. Just means that I can easily improve. Also means that I'm learning lots of new stuff if I can get it working but don't have a great idea of how to use it yet.

    Lots of good progress today. Even got some solid styling and animations in.

September 8th, 2022

    Would really like to get this done by the end of day friday so that I can show it off to my mom. Might just push what I've got done to heroku by the weekend. (INB4 RIP heroku)

    Since I finished this dope walking animation yesterday, I think I'll setup all the simulation stuff today, and clean up the worlds in general. Still not sure if I want the worlds to be customizable at all or even if they should be different. Should you be able to delete worlds? No idea yet. Theoretically, a lot of that wouldn't be so hard to implement.

September 9th, 2022

    Only worked on this for four days so far, but considering the new stack I'm working with, seems like things are going pretty well.
    Also, pug is the dopest shit. Today I need to start by having cruddies actually get deleted when dying. Some sort of issues with having the id actually sent to the server. Then I can either attempt to implement breeding/other random actions, or I can start the customization options.

September 11th, 2022

    Seems reasonable to try to limit this project to another couple days.

September 12th, 2022

    Welp, was making some good progress yesterday, but had to do some family favours, so didn't do more than two hours of work. Should be able to finish up all the logic related to items today, and maybe start cleaning up more of the UI.

    Somehow I fucked up my log dates. Also introduced some bugs in top/front item displaying, which I should be able to fix tomorrow. Along with writing the actual items to the cruddies and displaying them in worlds. Probably will try to quickly clean it up by end of day tomorrow or early wednesday, and then move on.



---To-Do---

DONE-Ability to add new cruddies
DONE-Ability to delete cruddies
CANCEL-Ability to name cruddies
-Create worlds/add cruddies to specific worlds 
DONE-random color options in creator
-idle animations
DONE-walking animations
-add hats and front accessories
-counts for each world population
-latest cruddies section
DONE-worlds can be overpopulated, starving cruddies
-different color cruddies have different traits.
CANCEL-add cruddies breeding over time
CANCEL-day/night + shadows?
CANCEL-click cruddy for random animation
-sort customizers by popularity
-mobile support
-different bush counts based on world
-fix in-world delete UI
DONE-dance machine score
-dancing skill based on colour
-some cruddies like dancing/eating more than others
-default shapes in item creator
