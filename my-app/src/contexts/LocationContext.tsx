"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type LocationData = {
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
};

type LocationContextType = {
  location: LocationData;
  setLocation: (location: LocationData) => void;
  detectCurrentLocation: () => Promise<boolean>;
  updateCustomLocation: (address: string) => void;
  isDetecting: boolean;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

const defaultLocation: LocationData = {
  address: "Regent Street, A4, A4201",
  city: "London",
  country: "UK",
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocationState] = useState<LocationData>(defaultLocation);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  const setLocation = (loc: LocationData) => setLocationState(loc);

  const detectCurrentLocation = async (): Promise<boolean> => {
    setIsDetecting(true);
    if (!navigator.geolocation) {
      setIsDetecting(false);
      return false;
    }
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationState({
            address: "Current Location",
            city: "",
            country: "",
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          setIsDetecting(false);
          resolve(true);
        },
        () => {
          setIsDetecting(false);
          resolve(false);
        }
      );
    });
  };

  const updateCustomLocation = (address: string) => {
    setLocationState({
      ...location,
      address,
    });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        detectCurrentLocation,
        updateCustomLocation,
        isDetecting,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
