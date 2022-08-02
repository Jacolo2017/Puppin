-- \connect puppin

-- --
-- -- Data for Name: profiles; Type: TABLE DATA
-- ---


-- INSERT INTO public.profiles (username, email, password, first_name, last_name, city, state, date_of_birth, photo_url, about, gender)
--     VALUES
--     ('cooper','cooper@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Cooper', 'Edmondson', 'Savanah', 'GA', '07-22-1994', 
--     ('jack', 'jack@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Jack', 'Ramirez', 'Westminster', 'CO', '04-14-1992', 
--     ('roger', 'roger@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Roger', 'Wang', 'San Francisco', 'CA', '04-20-1969', 
--     ('mark', 'mark@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Mark', 'Esposito', 'Austin', 'CO', '04-14-1992', 
--     ('user1', 'grace@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Grace', 'Lee', 'Reno', 'NV', '04-14-1992', 
--     ('user2', 'cindy@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Cindy', 'Lu', 'San Francisco', 'CA', '08-14-1992', 
--     ('user3', 'jenny@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Jenny', 'Li', 'San Francisco', 'CA', '06-01-1991', 
--     ('user4','melissa@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Melissa', 'Chang', 'Denver', 'CO', '12-19-1991', 
    


-- INSERT INTO public.dogs(dog_name, dog_breed, dog_age, dog_gender, dog_photo, dog_temperament, dog_about, dog_size, dog_weight, spayed_neutered, vaccination_history, account_id)
--     VALUES
--     ('Kanye Westie', '
--     ('Mary Puppins', 'yesenia@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Jack', 'Ramirez', 'Westminster', 'CO', '04-14-1992', 
--     ('Snoop Doggie Dog', 'corey@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Roger', 'Wang', 'San Francisco', 'CA', '04-20-1969', 
--     ('Indiana Bones', 'jeremy@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Mark', 'Esposito', 'Austin', 'CO', '04-14-1992', 
--     ('Chew Barka', 'grace@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Grace', 'Lee', 'Reno', 'NV', '04-14-1992', 
--     ('Al Poo-Chino', 'cindy@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Cindy', 'Lu', 'San Francisco', 'CA', '08-14-1992', 
--     ('Fresh Prints', 'jenny@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Jenny', 'Li', 'San Francisco', 'CA', '06-01-1991', 
--     ('Arya','melissa@gmail.com', '$2b$12$zsBt7dTdZ1DNC4SW5Szwzekh5BnX3iHzp4wNyeBZzDhG8FNpnL94u', 'Melissa', 'Chang', 'Denver', 'CO', '12-19-1991', 

-- INSERT INTO public.liked (active_user, target_user, liked)
--     VALUES
--     ('1', '6', True),
--     ('6', '1', False),
--     ('7', '5', False);

-- INSERT INTO public.matches (user1, user2, created_on)
--     VALUES
--     ('1', '2', '2022-06-06 12:20:00'),
--     ('3', '2', '2022-06-06 12:20:00'),
--     ('7', '8', '2022-06-06 12:20:00'),
--     ('5', '2', '2022-06-06 12:20:00'),
--     ('12', '11', '2022-06-06 12:20:00');


-- INSERT INTO public.chats (match_id, sender, recipient, sent, message)
--     VALUES
--     ('1', '1', '2', '2022-06-06 10:50:00', 'hello'),
--     ('1', '2', '1', '2022-06-06 11:20:00', 'leave me alone'),
--     ('1', '2', '1', '2022-06-15 01:32:37.363', 'bye'),
--     ('1', '1', '2', '2022-06-15 01:35:37.363', 'im sorry plz forgive me'),
--     ('1', '2', '1', '2022-06-15 01:38:37.363', 'creep'),
--     ('1', '1', '2', '2022-06-15 01:40:37.363', 'im sad'),
--     ('1', '1', '2', '2022-06-15 01:42:37.363', 'fine wahtever'),
--     ('2', '3', '2', '2022-06-20 12:32:37.363', 'whats up'),
--     ('2', '2', '3', '2022-06-20 12:40:37.363', 'chilling'),
--     ('2', '3', '2', '2022-06-20 12:43:37.363', 'do you have pets'),
--     ('2', '2', '3', '2022-06-20 12:48:37.363', 'i have a dog and shes the best'),
--     ('2', '2', '3', '2022-06-20 12:49:37.363', 'i love her'),
--     ('2', '3', '2', '2022-06-20 12:50:37.363', 'aww how cute'),
--     ('4', '5', '2', '2022-06-24 05:22:37.363', 'hows your day'),
--     ('4', '2', '5', '2022-06-24 05:24:37.363', 'pretty good, yours'),
--     ('4', '5', '2', '2022-06-24 05:26:37.363', 'been studying all day'),
--     ('4', '2', '5', '2022-06-24 05:28:37.363', 'me too - coding is so fun'),
--     ('4', '5', '2', '2022-06-24 05:29:37.363', 'love that'),
--     ('3', '7', '8', '2022-06-20 05:22:37.363', 'i like turtles'),
--     ('3', '8', '7', '2022-06-20 05:23:37.363', 'me too'),
--     ('5', '12', '11', '2022-06-24 05:30:37.363', 'you seem cool'),
--     ('5', '11', '12', '2022-06-24 05:32:37.363', 'i am cool'),
--     ('5', '12', '11', '2022-06-24 05:35:37.363', 'lets go on a date'),
--     ('5', '12', '11', '2022-06-24 05:36:37.363', 'downtown'),
--     ('5', '11', '12', '2022-06-24 05:37:37.363', 'im down');


-- INSERT INTO public.ratings (rating, rating_of, rating_by, review)
--     VALUES
--     ('5', '2', '1', 'paid for my dinner, was such a sweetheart all night. Only gonna be friends with them but they know how to treat a person right.'),
--     ('5', '7', '8', 'Was kind of bummed he wasn"t a real hero but definitely was super nice!'),
--     ('1', '1', '2', 'he said he forgot his wallet and made me pay for dinner. asshole. Didn"t put out either smh. waste of time.'),
--     ('3', '11', '12', 'low vibrations, but alright small talk'),
--     ('1', '2', '3', 'super cool girl - rating her low so no one takes her from me'),
--     ('1', '2', '5', 'imma marry this girl'),
--     ('3', '5', '2', 'loved his curly hair');