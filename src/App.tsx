import React, { useState, useEffect } from 'react';
import { MapPin, Bell, User as UserIcon, Calendar, Plus, Heart, MessageCircle, Users, } from 'lucide-react';

// Define TypeScript interfaces for data structures (kept here for simplicity, ideally in a types.ts file)
interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  comments: number;
  image: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  attendees: number;
  description: string;
}

interface Notification {
  id: number;
  text: string;
  time: string;
  type: 'like' | 'event' | 'follow';
}

interface UserType {
  username: string;
  email: string;
  car: string;
  bio?: string;
}

// --- START: HOISTED SCREEN COMPONENTS ---
// These components are now defined OUTSIDE the main ClutchClubApp component

interface AuthScreenProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  formData: { username: string; email: string; password: string; car: string; };
  setFormData: React.Dispatch<React.SetStateAction<{ username: string; email: string; password: string; car: string; }>>;
  handleAuth: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ isLogin, setIsLogin, formData, setFormData, handleAuth }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 italic">CLUTCH CLUB</h1>
        <p className="text-gray-600 text-center mb-8">Car Enthusiast Community</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-lg"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Your Car Model (e.g., Honda Civic)"
              className="w-full p-3 border rounded-lg"
              value={formData.car}
              onChange={(e) => setFormData({ ...formData, car: e.target.value })}
            />
          )}
          <button onClick={handleAuth} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold">
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </button>
        </div>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-semibold"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

interface FeedScreenProps {
  posts: Post[];
  user: UserType | null;
  newPost: string;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
  showNewPost: boolean;
  setShowNewPost: React.Dispatch<React.SetStateAction<boolean>>;
  addPost: () => void;
  likePost: (id: number) => void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  notifications: Notification[]; // Added to pass to Bell icon click for FeedScreen
}

const FeedScreen: React.FC<FeedScreenProps> = ({ posts, newPost, setNewPost, showNewPost, setShowNewPost, addPost, likePost, setCurrentScreen }) => {
  return (
    <div className="pb-20">
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold italic">CLUTCH CLUB</h1>
        <div className="flex space-x-2">
          <button onClick={() => setCurrentScreen('notifications')}>
            <Bell size={24} />
          </button>
          <button onClick={() => setShowNewPost(true)}>
            <Plus size={24} />
          </button>
        </div>
      </div>

      {showNewPost && (
        <div className="bg-white border-b p-4">
          <textarea
            placeholder="What's happening with your ride?"
            className="w-full p-3 border rounded-lg resize-none"
            rows={3}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button onClick={() => setShowNewPost(false)} className="px-4 py-2 text-gray-600">Cancel</button>
            <button onClick={addPost} className="px-4 py-2 bg-blue-600 text-white rounded">Post</button>
          </div>
        </div>
      )}

      <div className="space-y-4 p-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {post.user[0]}
              </div>
              <span className="ml-3 font-semibold">{post.user}</span>
            </div>
            <p className="mb-3">{post.content}</p>
            <img src={post.image} alt="Car" className="w-full h-48 object-cover rounded-lg mb-3" />
            <div className="flex items-center space-x-4">
              <button onClick={() => likePost(post.id)} className="flex items-center space-x-1 text-gray-600">
                <Heart size={20} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600">
                <MessageCircle size={20} />
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


interface EventsScreenProps {
  events: Event[];
  selectedEvent: Event | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  showEngagementForm: boolean;
  setShowEngagementForm: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
}

const EventsScreen: React.FC<EventsScreenProps> = ({ events, selectedEvent, setSelectedEvent, showEngagementForm, setShowEngagementForm, user }) => {
  // Engagement Form component (still nested for now, but self-contained)
  interface EngagementFormProps {
    event: Event;
    onClose: () => void;
    user: UserType | null; // Pass user to EngagementForm
  }

  const EngagementForm: React.FC<EngagementFormProps> = ({ event, onClose, user }) => {
    const [engagementFormData, setEngagementFormData] = useState({ name: user?.username || '', car: user?.car || '', message: '' });

    useEffect(() => {
      if (user) {
        setEngagementFormData({ name: user.username, car: user.car, message: '' });
      }
    }, [user]);

    const handleSubmit = () => {
      alert(`Successfully registered for ${event.name}!`);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">Register for {event.name}</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded"
              value={engagementFormData.name}
              onChange={(e) => setEngagementFormData({ ...engagementFormData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Your Car"
              className="w-full p-3 border rounded"
              value={engagementFormData.car}
              onChange={(e) => setEngagementFormData({ ...engagementFormData, car: e.target.value })}
            />
            <textarea
              placeholder="Tell us about your ride or why you want to join!"
              className="w-full p-3 border rounded resize-none"
              rows={3}
              value={engagementFormData.message}
              onChange={(e) => setEngagementFormData({ ...engagementFormData, message: e.target.value })}
            />
            <div className="flex space-x-2">
              <button type="button" onClick={onClose} className="flex-1 p-3 border rounded">
                Cancel
              </button>
              <button onClick={handleSubmit} className="flex-1 p-3 bg-blue-600 text-white rounded">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const closeForm = () => {
    setShowEngagementForm(false);
    setSelectedEvent(null);
  };

  return (
    <div className="pb-20">
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-bold">Upcoming Events</h1>
      </div>

      <div className="p-4 space-y-4">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{event.name}</h3>
              <span className="text-sm text-gray-500">{event.date}</span>
            </div>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span className="text-sm">{event.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={16} />
                <span className="text-sm">{event.attendees} attending</span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedEvent(event);
                setShowEngagementForm(true);
              }}
              className="w-full bg-blue-600 text-white p-2 rounded font-semibold"
            >
              Join Event
            </button>
          </div>
        ))}
      </div>

      {showEngagementForm && selectedEvent && (
        <EngagementForm event={selectedEvent} onClose={closeForm} user={user} />
      )}
    </div>
  );
};


interface GPSScreenProps {
  location: { lat: number; lng: number; };
}

const GPSScreen: React.FC<GPSScreenProps> = ({ location }) => (
  <div className="pb-20">
    <div className="bg-white border-b p-4">
      <h1 className="text-xl font-bold">GPS & Location</h1>
    </div>
    <div className="p-4">
      <div className="bg-blue-100 rounded-lg p-4 mb-4">
        <h3 className="font-bold mb-2">Current Location</h3>
        <p>Lat: {location.lat.toFixed(4)}</p>
        <p>Lng: {location.lng.toFixed(4)}</p>
      </div>

      <div className="space-y-3">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold">🏁 Nearby Events</h4>
          <p className="text-sm text-gray-600">Sunday Car Meet - 2.3 miles away</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold">🔧 Service Centers</h4>
          <p className="text-sm text-gray-600">AutoZone - 1.8 miles away</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold">⛽ Gas Stations</h4>
          <p className="text-sm text-gray-600">Shell Station - 0.5 miles away</p>
        </div>
      </div>
    </div>
  </div>
);

interface ProfileScreenProps {
  user: UserType | null;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  profileData: UserType | null;
  setProfileData: React.Dispatch<React.SetStateAction<UserType | null>>;
  saveProfileChanges: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, editing, setEditing, profileData, setProfileData, saveProfileChanges }) => {
  // Sync profileData with user when user object changes (e.g., after login)
  useEffect(() => {
    if (user) {
      setProfileData(user);
    }
  }, [user, setProfileData]); // Added setProfileData to dependencies to avoid lint warning

  return (
    <div className="pb-20">
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Profile</h1>
        <button onClick={() => setEditing(!editing)} className="text-blue-600">
          {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="p-4">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
            {user?.username?.[0] || 'U'} {/* Added optional chaining and default 'U' */}
          </div>
          {editing ? (
            <input
              type="text"
              value={profileData?.username || ''}
              onChange={(e) => setProfileData(prev => prev ? { ...prev, username: e.target.value } : null)}
              className="text-xl font-bold text-center border rounded p-2"
            />
          ) : (
            <h2 className="text-xl font-bold">{user?.username}</h2>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Car Information</h3>
            {editing ? (
              <input
                type="text"
                value={profileData?.car || ''}
                onChange={(e) => setProfileData(prev => prev ? { ...prev, car: e.target.value } : null)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p>{user?.car}</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Bio</h3>
            {editing ? (
              <textarea
                value={profileData?.bio || ''}
                onChange={(e) => setProfileData(prev => prev ? { ...prev, bio: e.target.value } : null)}
                className="w-full p-2 border rounded resize-none"
                rows={3}
                placeholder="Tell us about yourself and your ride..."
              />
            ) : (
              <p>{user?.bio || 'Car enthusiast and weekend warrior.'}</p>
            )}
          </div>

          {editing && (
            <button onClick={saveProfileChanges} className="w-full bg-blue-600 text-white p-3 rounded font-semibold">
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


interface NotificationsScreenProps {
  notifications: Notification[];
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ notifications, setCurrentScreen }) => (
  <div className="pb-20">
    <div className="bg-white border-b p-4 flex items-center">
      <button onClick={() => setCurrentScreen('feed')} className="mr-3">
        ←
      </button>
      <h1 className="text-xl font-bold">Notifications</h1>
    </div>
    <div className="p-4 space-y-3">
      {notifications.map(notif => (
        <div key={notif.id} className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
            {notif.type === 'like' ? '❤️' : notif.type === 'event' ? '📅' : '👥'}
          </div>
          <div className="flex-1">
            <p>{notif.text}</p>
            <p className="text-sm text-gray-500">{notif.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- END: HOISTED SCREEN COMPONENTS ---


// Main ClutchClubApp Component
const ClutchClubApp = () => {
  const [currentScreen, setCurrentScreen] = useState('feed');
  const [user, setUser] = useState<UserType | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 });

  // State for AuthScreen
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', car: '' });

  // State for FeedScreen
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  // State for EventsScreen
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEngagementForm, setShowEngagementForm] = useState(false);

  // State for ProfileScreen
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserType | null>(null);


  // Initialize data when user state changes
  useEffect(() => {
    if (user) {
      setPosts([
        { id: 1, user: 'ChrisHemsworth00', content: 'Just cleaned the whip. Looking fresh for the Sunday meet.', likes: 24, comments: 8, image: 'https://images.unsplash.com/photo-1686914687902-e58579225e84?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 2, user: 'TurboTim_95', content: 'New wheels finally came in! Can\'t wait to take her for a spin 🔥', likes: 42, comments: 15, image: 'https://images.unsplash.com/photo-1745943375065-da7351159408?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 3, user: 'DriftKing2023', content: 'Track day was insane! Got some sick footage sliding around turn 3.', likes: 67, comments: 23, image: 'https://images.unsplash.com/photo-1696182664993-880238f55be6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
      ]);

      setEvents([
        { id: 1, name: 'Sunday Car Meet', date: '2025-05-25', location: 'Central Park', attendees: 45, description: 'Weekly car enthusiast meetup' },
        { id: 2, name: 'Track Day at Silverstone', date: '2025-06-02', location: 'Silverstone Circuit', attendees: 120, description: 'Professional track day event' },
        { id: 3, name: 'JDM Festival 2025', date: '2025-06-15', location: 'Tokyo Drift Arena', attendees: 300, description: 'Celebrating Japanese car culture' }
      ]);

      setNotifications([
        { id: 1, text: 'BenDover liked your post', time: '2h ago', type: 'like' },
        { id: 2, text: 'New event: Sunday Car Meet', time: '1d ago', type: 'event' },
        { id: 3, text: 'You have 3 new followers', time: '2d ago', type: 'follow' }
      ]);

      setProfileData(user);
    }
  }, [user]);

  // GPS Location (runs once on component mount)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.log('Location access denied', error)
      );
    }
  }, []);

  // Handle user authentication (login/register)
  const handleAuth = () => {
    if (formData.username.trim()) {
      if (isLogin) {
        setUser({ username: formData.username || 'UserTest123', email: formData.email, car: 'Volvo V40', bio: 'Car enthusiast and weekend warrior.' });
      } else {
        setUser({ username: formData.username, email: formData.email, car: formData.car || 'Not specified', bio: 'Car enthusiast and weekend warrior.' });
      }
    }
  };

  // Add a new post to the feed
  const addPost = () => {
    if (newPost.trim() && user) {
      setPosts([{
        id: Date.now(),
        user: user.username,
        content: newPost,
        likes: 0,
        comments: 0,
        image: 'https://images.unsplash.com/photo-1494976688141-f377b5e1e5d2?w=400&h=300&fit:crop'
      }, ...posts]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  // Like a post
  const likePost = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  // Save profile changes
  const saveProfileChanges = () => {
    if (profileData) {
      setUser(profileData);
      setEditing(false);
    }
  };

  // Main Navigation (still nested as it directly uses currentScreen)
  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 flex justify-around items-center h-16 shadow-lg z-10"> {/* Added z-10 to ensure it's on top */}
      <button onClick={() => setCurrentScreen('feed')} className={`flex flex-col items-center justify-center text-sm ${currentScreen === 'feed' ? 'text-blue-600' : 'text-gray-500'}`}>
        <Bell size={20} />
        <span>Feed</span>
      </button>
      <button onClick={() => setCurrentScreen('events')} className={`flex flex-col items-center justify-center text-sm ${currentScreen === 'events' ? 'text-blue-600' : 'text-gray-500'}`}>
        <Calendar size={20} />
        <span>Events</span>
      </button>
      <button onClick={() => setCurrentScreen('gps')} className={`flex flex-col items-center justify-center text-sm ${currentScreen === 'gps' ? 'text-blue-600' : 'text-gray-500'}`}>
        <MapPin size={20} />
        <span>GPS</span>
      </button>
      <button onClick={() => setCurrentScreen('profile')} className={`flex flex-col items-center justify-center text-sm ${currentScreen === 'profile' ? 'text-blue-600' : 'text-gray-500'}`}>
        <UserIcon size={20} />
        <span>Profile</span>
      </button>
      <button onClick={() => setCurrentScreen('notifications')} className={`flex flex-col items-center justify-center text-sm ${currentScreen === 'notifications' ? 'text-blue-600' : 'text-gray-500'}`}>
        <Bell size={20} />
        <span>Notifications</span>
      </button>
    </div>
  );

  if (!user) {
    return (
      <AuthScreen
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        formData={formData}
        setFormData={setFormData}
        handleAuth={handleAuth}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {currentScreen === 'feed' && (
        <FeedScreen
          posts={posts}
          user={user}
          newPost={newPost}
          setNewPost={setNewPost}
          showNewPost={showNewPost}
          setShowNewPost={setShowNewPost}
          addPost={addPost}
          likePost={likePost}
          setCurrentScreen={setCurrentScreen}
          notifications={notifications} // Added to pass to Bell icon click for FeedScreen
        />
      )}
      {currentScreen === 'events' && (
        <EventsScreen
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          showEngagementForm={showEngagementForm}
          setShowEngagementForm={setShowEngagementForm}
          user={user}
        />
      )}
      {currentScreen === 'gps' && (
        <GPSScreen
          location={location}
        />
      )}
      {currentScreen === 'profile' && (
        <ProfileScreen
          user={user}
          editing={editing}
          setEditing={setEditing}
          profileData={profileData}
          setProfileData={setProfileData}
          saveProfileChanges={saveProfileChanges}
        />
      )}
      {currentScreen === 'notifications' && (
        <NotificationsScreen
          notifications={notifications}
          setCurrentScreen={setCurrentScreen}
        />
      )}
      <BottomNavigation />
    </div>
  );
};

export default ClutchClubApp;