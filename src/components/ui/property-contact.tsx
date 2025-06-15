import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Textarea } from './textarea';
import { Input } from './input';
import { Property } from '../../types';

interface PropertyContactProps {
  property: Property;
}

export const PropertyContact: React.FC<PropertyContactProps> = ({ property }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Hello, I'm interested in ${property.title} (ID: ${property.id}). Please contact me with more information.`);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 3000);
    }, 1000);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-xl">Contact Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-3">
          {property.agent.photo && (
            <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
              <img src={property.agent.photo} alt={property.agent.name} className="h-full w-full object-cover" />
            </div>
          )}
          <div>
            <div className="font-medium">{property.agent.name}</div>
            <div className="text-sm text-muted-foreground">{property.agent.email}</div>
            <div className="text-sm text-muted-foreground">{property.agent.phone}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Input
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSending || isSent}
          >
            {isSending ? 'Sending...' : isSent ? 'Message Sent!' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};