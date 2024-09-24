/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../api'; // Import your API function
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const loggedInUser = useSelector(state => state.auth.user); // Get user from Redux store

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile(); // Fetch user profile data
                setUser(userData);
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching user profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!user) {
        return <Typography>Error: User data not found.</Typography>;
    }

    return (
        <Card className="mt-4">
            <CardContent>
                <Typography variant="h4">{user.name}'s Profile</Typography>
                <Typography variant="h6">Email: {user.email}</Typography>
                <Typography variant="h6">Borrowed Books:</Typography>
                <List>
                    {/* Check if borrowedBooks is defined and has items */}
                    {user.borrowedBooks && user.borrowedBooks.length > 0 ? (
                        user.borrowedBooks.map(book => (
                            <ListItem key={book._id}>
                                <Typography>{book.title}</Typography>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No books borrowed.</Typography>
                    )}
                </List>
            </CardContent>
        </Card>
    );
};

export default UserProfile;
