\connect puppin

--
-- Data for Name: profiles; Type: TABLE DATA
---


INSERT INTO public.accounts (username, email, account_password, first_name, last_name, city, state, date_of_birth, photo_url, about, gender)
    VALUES
    ('aurora','cooper@gmail.com', '$2b$12$XfjF3AFiKdJePpJBuf.RKOqSI2jFxP9WdwUKqSxaHpcPttXmZj9/O', 'Aurora', 'Pio', 'San Diege', 'CA', '07-23-1994', 'https://media-exp1.licdn.com/dms/image/C5603AQEPTlEhreYi5w/profile-displayphoto-shrink_800_800/0/1647993954393?e=1665619200&v=beta&t=IXuMkF_3qn4lPN_lLj7CNkAdzsCFvNJI7OLdkrbqpCg', 'Camera On Culture', 'female'),
    ('cooper','cooper@gmail.com', '$2b$12$XfjF3AFiKdJePpJBuf.RKOqSI2jFxP9WdwUKqSxaHpcPttXmZj9/O', 'Cooper', 'Edmondson', 'Savanah', 'GA', '07-21-1994', 'https://media-exp1.licdn.com/dms/image/C4E03AQGy0zsKhTT4Ig/profile-displayphoto-shrink_800_800/0/1654194278503?e=1663804800&v=beta&t=yL5rghfj5qNyLLaYmx6D7TfKHdsRH-dmU4aa_nr8CYk', 'Front end wizard', 'male'),
    ('jack', 'jack@gmail.com', '$2b$12$XfjF3AFiKdJePpJBuf.RKOqSI2jFxP9WdwUKqSxaHpcPttXmZj9/O', 'Jack', 'Ramirez', 'Westminster', 'CO', '04-14-1992', 'https://media-exp1.licdn.com/dms/image/C4E03AQGy0zsKhTT4Ig/profile-displayphoto-shrink_800_800/0/1654194278503?e=1663804800&v=beta&t=yL5rghfj5qNyLLaYmx6D7TfKHdsRH-dmU4aa_nr8CYk', 'Coding connoisseur', 'male'),
    ('roger', 'roger@gmail.com', '$2b$12$XfjF3AFiKdJePpJBuf.RKOqSI2jFxP9WdwUKqSxaHpcPttXmZj9/O', 'Roger', 'Wang', 'San Francisco', 'CA', '04-20-1969', 'https://media-exp1.licdn.com/dms/image/C5603AQGR8-zm2zDSFg/profile-displayphoto-shrink_800_800/0/1658786569955?e=1664409600&v=beta&t=0Ee5oFmjYNwkQ6u8Kee_SVg9hHa-ujeU1TfQPo2gYm0', 'Back End Buff', 'male'),
    ('mark', 'mark@gmail.com', '$2b$12$XfjF3AFiKdJePpJBuf.RKOqSI2jFxP9WdwUKqSxaHpcPttXmZj9/O', 'Mark', 'Esposito', 'Austin', 'CO', '04-14-1992', 'https://media-exp1.licdn.com/dms/image/C5603AQETMiOEVjx9Hg/profile-displayphoto-shrink_800_800/0/1626865528939?e=1663804800&v=beta&t=9Jzy-pJZcirCasnNRFutdU5Iyn79bgP0VqXeS8gP5-Y', 'Programming Pro', 'male'),
    ('user1', 'grace@gmail.com', '$2b$12$XfjF3AFiKdJePpJBuf.RKOqSI2jFxP9WdwUKqSxaHpcPttXmZj9/O', 'Grace', 'Lee', 'Reno', 'NV', '04-14-1992', 'https://image.shutterstock.com/image-photo/funny-grandmother-portraits-80s-style-600w-1522642544.jpg', 'I have 42 dogs', 'female'),
    ('user2', 'jenny@gmail.com', '$2b$12$XfjF3AFiKdJePpJBuf.RKOqSI2jFxP9WdwUKqSxaHpcPttXmZj9/O', 'Jenny', 'Herr', 'San Francisco', 'CA', '06-01-1991', 'https://image.shutterstock.com/image-photo/food-vlogger-recording-video-600w-1338120278.jpg', 'Instagram Influencer', 'female'),
    ('melissa','melissa@gmail.com', '$2b$12$XfjF3AFiKdJePpJBuf.RKOqSI2jFxP9WdwUKqSxaHpcPttXmZj9/O', 'Melissa', 'Chang', 'Denver', 'CO', '12-19-1991', 'https://image.shutterstock.com/image-photo/happy-young-asian-woman-smartphone-600w-452226463.jpg', 'Programming Pro', 'male');
    


INSERT INTO public.dogs(dog_name, dog_breed, dog_age, dog_gender, dog_photo, dog_temperament, dog_about, dog_size, dog_weight, spayed_neutered, vaccination_history, account_id)
    VALUES
    ('Izzy', 'mixed', '5', 'female', 'https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_400/MTc0OTY4ODk3OTMyMzcxMzk2/top-10-ugliest-dog-breeds.webp', 'enjoys other dogs and their humans', 'Izzy is a super smart tripawed who doesnt know her own limits. She cant play rough but thats not her choice. She loves searching games and solving puzzles.', 'Medium', '60', 'true', 'up to date', '1'),
    ('Snoop Doggie Dog', 'greyhound, italian', '20', 'male', 'https://i.pinimg.com/564x/af/5e/70/af5e70122657909248da2294821c8987.jpg', 'Chill', 'Spits bars and barks fresh flows', 'medium', '62', 'false', 'Hell nah', '2'),
    ('Fresh Prints', 'pitbull', '20', 'male', 'https://laughingsquid.com/wp-content/uploads/freshpup.jpg', 'New money', 'In west county shelter born and raised, in the kennel is where I lived with most of the strays', 'medium', '62', 'false', 'spoonful of sugar', '3'),
    ('Chew Barka', 'briard', '99', 'male', 'https://pbs.twimg.com/media/EzQnczlVEAgoHeS?format=jpg&name=large', 'Friendly to all except the empire', 'Loves his crossbow toy', 'large', '100', 'false', 'Might have rabies', '4'),
    ('Indiana Bones', 'retreiver, golden', '7', 'male', 'https://images.squarespace-cdn.com/content/v1/5c25bdee3917ee83c55c9cdc/1635735122903-6BE8ZQVXQRGWLUM0SL39/download-1.jpg?format=2500w', 'Adventurous', 'Always getting into trouble everywhere he goes', 'medium', '62', 'false', 'up to date', '5'),
    ('Mary Puppins', 'bulldog, english', '7', 'female', 'https://images.squarespace-cdn.com/content/v1/58acf292e6f2e15b746a1000/1504625224010-OR84RBIWNSF6J385ZO9D/Mary+Poppins-1000.png?format=1000w', 'Excessively British', 'Kind, witty, sweet, and fairly pretty', 'medium', '62', 'false', 'spoonful of sugar', '6'),
    ('Al Poo-Chino', 'terrier, westhighland', '10', 'male', 'https://i.pinimg.com/564x/c5/1e/fd/c51efdc067078d4dcdbfb04c5165fdfd.jpg', 'Loves to watch Godfather & scarface', 'Same hello to my little fur freind', 'medium', '45', 'false', 'yes', '7'),
    ('Arya', 'cattledog, australian', '2', 'female', 'https://www.thegoodypet.com/wp-content/uploads/2022/02/Black-And-White-Australian-Shepherd-1.jpeg', 'Engergetic', 'Barks at men at first but is a big chicken', 'medium', '38', 'false', 'Up to date', '8');


INSERT INTO public.events (event_name, event_location, event_date_time, account_id)
    VALUES
    ('The great dog meetup', 'Auroras Backyard', '2022-06-28 12:00:00.000000+06:00', '1'),
    ('Dog costume Party', 'Atlanta Dog Park', '2022-07-31 12:00:00.000000+06:00', '3'),
    ('The Butt Sniffers', 'The Yellowstone Dutton Ranch', '2023-06-28 12:00:00.000000+06:00', '5'),
    ('Barks Under the Bridge', 'Under GG Bridge', '2022-06-28 12:00:00.000000+06:00', '4'),
    ('Dog costume Party Reunion', 'Coops Backyard', '2023-06-30 12:00:00.000000+06:00', '2');

INSERT INTO public.reviews (reviewer_username, account_id, review_event, event_id, review_description, location_rating)
    VALUES
    ('aurora', '1', 'The great dog meetup', '1', 'Camera were not on, wouldnt recommend', 'My backyard was awesome because I live in SoCal'),
    ('aurora', '1', 'Dog costume Party', '2', 'Awesome, everyones dog looked hilarous', 'Traffic was insane'),
    ('melissa', '8', 'Dog costume Party', '2', 'Inappropaite costumes, the dog was practically naked', 'Atlanta dog park was cool'),
    ('roger', '4', 'Barks Under the Bridge', '4', 'As a CEO of my lucrative startup, this was a great event for recruiting the best programmers in the world', 'What a view!'),
    ('mark', '5', 'Barks Under the Bridge', '4', 'Nice event, good networking with very talented programmers', 'Nerded out about the bridge structure'),
    ('coop', '2', 'Barks Under the Bridge', '4', 'Bet. Backend coders paired nicely with my front end wizardry.', 'Yo Yo, location was sick, rocket legeau?'),
    ('jack', '3', 'Barks Under the Bridge', '4', 'Met some wizards with the code. Great time, except for a girl trying to get selfies the while time.', 'Weather was great, cool location'),
    ('user2', '7', 'Barks Under the Bridge', '4', 'If I could give this event negative starts I would. I could not even get a good selfie at the event because all these stoopid dogs kept trying to play with me. Honestly, why even go to an event if I cannot show off to my followers about how beutiful and trendy I am', 'Terrible location, who has an event under a brdige.');


INSERT INTO public.eventsusersjunction (event_id, account_id)
    VALUES
    ('1', '1'),
    ('2', '1'),
    ('2', '8'),
    ('4', '4'),
    ('4', '5'),
    ('4', '2'),
    ('4', '3'),
    ('4', '7'),
    ('3', '1'),
    ('3', '2'),
    ('3', '3'),
    ('3', '4'),
    ('3', '5'),
    ('5', '1'),
    ('5', '2'),
    ('5', '3'),
    ('5', '4'),
    ('5', '5');



INSERT INTO public.ratingaccountsinevents (reviewer_id, reviewed_id, event_id, rating)
    VALUES
    ('1', '8', '2', 'false'),
    ('8', '1', '2', 'true'),
    ('4', '2', '4', 'true'),
    ('4', '3', '4', 'true'),
    ('2', '3', '4', 'true'),
    ('2', '4', '4', 'true'),
    ('2', '5', '4', 'true'),
    ('3', '2', '4', 'true'),
    ('3', '4', '4', 'true'),
    ('3', '5', '4', 'true'),
    ('3', '7', '4', 'false'),
    ('2', '7', '4', 'false'),
    ('4', '7', '4', 'false'),
    ('5', '1', '4', 'true'),
    ('5', '2', '4', 'true');




INSERT INTO public.dogsinevents (account_id, dog_id, event_id)
    VALUES
    ('1', '1', '2'),
    ('8', '8', '2'),
    ('1', '1', '1'),
    ('2', '2', '3'),
    ('2', '2', '4'),
    ('2', '2', '5'),
    ('3', '3', '3'),
    ('3', '3', '4'),
    ('3', '3', '5'),
    ('4', '4', '3'),
    ('4', '4', '4'),
    ('4', '4', '5'),
    ('5', '5', '3'),
    ('5', '5', '4'),
    ('5', '5', '5');




