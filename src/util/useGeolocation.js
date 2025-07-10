import { useState, useEffect, useRef, useCallback } from 'react';

// Helper: Reverse geocode using OpenStreetMap Nominatim
async function reverseGeocode(lat, lon) {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        return data.display_name || '';
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        return '';
    }
}

// Helper: Extract 6-digit pin code from address string
function extractPinCode(address) {
    const match = address && address.match(/\b\d{6}\b/);
    return match ? match[0] : null;
}

export default function useGeolocation({ onAutoDetect } = {}) {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userTypedRef = useRef(false);

    // Only auto-fill if user hasn't typed
    const triggerGeolocation = useCallback(() => {
        setLoading(true);
        setError(null);
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                const addr = await reverseGeocode(latitude, longitude);
                setPinCode(extractPinCode(addr));
                setLoading(false);
                if (!userTypedRef.current) {
                    setAddress(addr);
                    if (onAutoDetect) onAutoDetect(addr);
                }
            },
            () => {
                setError('Unable to retrieve your location');
                setLoading(false);
            }
        );
    }, [onAutoDetect]);

    // Initial auto-detect on mount
    useEffect(() => {
        triggerGeolocation();
        // eslint-disable-next-line
    }, []);

    // Allow parent to mark if user has typed
    const setUserTyped = (typed) => {
        userTypedRef.current = typed;
    };

    return {
        ...location,
        address,
        setAddress,
        pinCode,
        loading,
        error,
        triggerGeolocation,
        setUserTyped,
    };
} 