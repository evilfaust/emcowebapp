import React, { createContext, useContext, useState } from 'react';

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  created_at: string;
  user: number;
}

export interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications(prevNotifications => [...prevNotifications, notification]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === parseInt(id) ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
