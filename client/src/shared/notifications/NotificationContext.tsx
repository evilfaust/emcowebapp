import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Notification {
  id: string;
  message: string;
  read: boolean;
}

interface NotificationContextProps {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  addNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prevNotifications => [...prevNotifications, notification]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
