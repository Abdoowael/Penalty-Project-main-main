import { useState, useEffect, createContext } from 'react';
import { playersData as initialPlayersData } from '../data/playersData';

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState(() => {
        const savedPlayers = localStorage.getItem('playersData_v2');
        let initialList = initialPlayersData;
        if (savedPlayers) {
            const parsed = JSON.parse(savedPlayers);
            // Merge: source-code data (orig) always wins for core fields,
            // but we keep localStorage-only fields like youtube
            initialList = initialPlayersData.map(orig => {
                const saved = parsed.find(p => p.id === orig.id);
                return saved ? { ...saved, ...orig, youtube: saved.youtube || orig.youtube } : orig;
            }).concat(parsed.filter(p => !initialPlayersData.find(o => o.id === p.id)));
        }
        // Filter out the unwanted player to ensure he is removed from state and subsequently localStorage
        return initialList.filter(p => 
            p.name !== "سعد محمد طلبة" && 
            p.name !== "سعد محمد طلبه"
        );
    });

    const [applications, setApplications] = useState(() => {
        const savedApps = localStorage.getItem('playerApplications');
        const apps = savedApps ? JSON.parse(savedApps) : [];
        return apps.filter(app => 
            app.name !== "سعد محمد طلبة" && 
            app.name !== "سعد محمد طلبه"
        );
    });

    useEffect(() => {
        localStorage.setItem('playersData_v2', JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        localStorage.setItem('playerApplications', JSON.stringify(applications));
    }, [applications]);

    const addPlayer = (newPlayer) => {
        const maxId = players.reduce((max, player) => Math.max(max, player.id), 0);

        const playerToAdd = {
            id: maxId + 1,
            name: newPlayer.name,
            year: newPlayer.year || "2024",
            height: newPlayer.height || "غير محدد",
            weight: newPlayer.weight ? (typeof newPlayer.weight === 'string' && newPlayer.weight.includes('كجم') ? newPlayer.weight : `${newPlayer.weight} كجم`) : "غير محدد",
            position: newPlayer.position,
            residence: newPlayer.residence || '',
            club: newPlayer.club || '',
            image: newPlayer.image || "/Logo.png",
            description: newPlayer.description || `لاعب جديد انضم إلينا مؤخراً في مركز ${newPlayer.position}.`,
            youtube: newPlayer.youtube || ""
        };

        setPlayers(prevPlayers => [playerToAdd, ...prevPlayers]);
    };

    const updatePlayerVideo = (playerId, videoUrl) => {
        setPlayers(prev => prev.map(p =>
            p.id === playerId ? { ...p, youtube: videoUrl } : p
        ));
    };

    const submitApplication = (appData) => {
        const newApp = {
            id: Date.now(),
            ...appData,
            status: 'pending',
            date: new Date().toISOString()
        };
        setApplications(prev => [newApp, ...prev]);
    };

    const approveApplication = (appId) => {
        const appToApprove = applications.find(app => app.id === appId);
        if (appToApprove) {
            addPlayer(appToApprove);
            setApplications(prev => prev.filter(app => app.id !== appId));
        }
    };

    const rejectApplication = (appId) => {
        setApplications(prev => prev.filter(app => app.id !== appId));
    };

    const deletePlayer = (id) => {
        setPlayers(prevPlayers => prevPlayers.filter(player => String(player.id) !== String(id)));
    };

    return (
        <PlayersContext.Provider value={{
            players,
            addPlayer,
            deletePlayer,
            applications,
            submitApplication,
            approveApplication,
            rejectApplication,
            updatePlayerVideo
        }}>
            {children}
        </PlayersContext.Provider>
    );
};
