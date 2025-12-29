'use client';

import React from 'react';

// Custom interface based on observed usage patterns
export interface ExtendedLocalUserChoices {
  username: string;
  token?: string;
  serverUrl?: string;
  videoEnabled: boolean;
  audioEnabled: boolean;
  videoDeviceId?: string;
  audioDeviceId?: string;
}

interface CustomPreJoinProps {
  defaults: Partial<ExtendedLocalUserChoices>;
  onSubmit: (values: ExtendedLocalUserChoices) => void;
  onError: (error: any) => void;
}

export function CustomPreJoin({ defaults, onSubmit, onError }: CustomPreJoinProps) {
  const [username, setUsername] = React.useState(defaults.username || '');
  const [token, setToken] = React.useState(defaults.token || '');
  const [serverUrl, setServerUrl] = React.useState(defaults.serverUrl || '');
  const [videoEnabled, setVideoEnabled] = React.useState(defaults.videoEnabled ?? true);
  const [audioEnabled, setAudioEnabled] = React.useState(defaults.audioEnabled ?? true);
  
  const hasToken = token.trim().length > 0;

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const values: ExtendedLocalUserChoices = {
        username,
        token: token.trim() || undefined,
        serverUrl: serverUrl.trim() || undefined,
        videoEnabled,
        audioEnabled,
      };
      
      onSubmit(values);
    } catch (error) {
      onError(error);
    }
  }, [username, token, serverUrl, videoEnabled, audioEnabled, onSubmit, onError]);

  return (
    <div className="lk-prejoin" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '2rem',
      maxWidth: '400px',
      margin: '0 auto' 
    }}>
      <div className="lk-prejoin-main" style={{ width: '100%' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: 'white',
          fontSize: '1.5rem'
        }}>
          Join Room
        </h2>
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem' 
        }}>
          <div className="lk-form-control">
            <label htmlFor="username" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem'
            }}>
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div className="lk-form-control">
            <label htmlFor="token" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem'
            }}>
              Token (optional):
            </label>
            <input
              id="token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your token (leave empty to generate)"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
            <small style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '0.8em',
              display: 'block',
              marginTop: '0.25rem'
            }}>
              If provided, this token will be used directly instead of generating one from username
            </small>
          </div>

          {hasToken && (
            <div className="lk-form-control">
              <label htmlFor="serverUrl" style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.9rem'
              }}>
                Server URL:
              </label>
              <input
                id="serverUrl"
                type="text"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="wss://your-livekit-server.com"
                required={hasToken}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              />
              <small style={{ 
                color: 'rgba(255, 255, 255, 0.6)', 
                fontSize: '0.8em',
                display: 'block',
                marginTop: '0.25rem'
              }}>
                Required when using a custom token
              </small>
            </div>
          )}

          <div className="lk-form-control" style={{ 
            display: 'flex', 
            gap: '1rem',
            marginTop: '1rem' 
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem'
            }}>
              <input
                type="checkbox"
                checked={videoEnabled}
                onChange={(e) => setVideoEnabled(e.target.checked)}
                style={{ accentColor: '#0090ff' }}
              />
              Enable Camera
            </label>

            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.9rem'
            }}>
              <input
                type="checkbox"
                checked={audioEnabled}
                onChange={(e) => setAudioEnabled(e.target.checked)}
                style={{ accentColor: '#0090ff' }}
              />
              Enable Microphone
            </label>
          </div>

          <button 
            type="submit" 
            className="lk-button"
            disabled={!username.trim() || (hasToken && !serverUrl.trim())}
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              opacity: (!username.trim() || (hasToken && !serverUrl.trim())) ? 0.5 : 1,
              cursor: (!username.trim() || (hasToken && !serverUrl.trim())) ? 'not-allowed' : 'pointer'
            }}
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
