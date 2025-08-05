import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface ChatItemProps {
  content: string;
  role: 'user' | 'assistant';
}
interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}
const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const auth = useAuth();

  // Extract user initials for avatar
  const getUserInitials = (): string => {
    const name = auth?.user?.name || '';
    const parts = name.trim().split(' ');
    const firstInitial = parts[0]?.[0] || '';
    const secondInitial = parts[1]?.[0] || '';
    return `${firstInitial}${secondInitial}`;
  };

  return role === 'assistant' ? (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: 'rgb(43, 42, 59)',
        gap: 2,
        borderRadius: 2,
        my: 1,
        maxWidth: '90%',
        alignSelf: 'flex-start',
      }}
    >
      <Avatar sx={{ ml: '0', bgcolor: '#004d56' }}>
        <img src="OpenAI.png" alt="AI" width="24px" />
      </Avatar>
      <Box sx={{ overflowX: 'auto', width: '100%' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }: CodeProps) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline ? (
                <SyntaxHighlighter
                  style={coldarkDark}
                  language={match?.[1] || 'javascript'}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <Typography sx={{ fontSize: '18px', lineHeight: 1.8, mb: 1, color: 'rgb(248, 250, 255)'}}>{children}</Typography>;
            },
            h1({ children }) {
              return <Typography variant="h5" sx={{ fontSize: '22px', fontWeight: 600, mt: 2, mb: 1, color: 'rgb(248, 250, 255)' }}>{children}</Typography>;
            },
            h2({ children }) {
              return <Typography variant="h6" sx={{fontSize: '20px', fontWeight: 600, mt: 2, mb: 1, color: 'rgb(248, 250, 255)' }}>{children}</Typography>;
            },
            ul({ children }) {
              return <Box component="ul" sx={{ pl: 3, mb: 2 }}>{children}</Box>;
            },
            ol({ children }) {
              return <Box component="ol" sx={{ pl: 3, mb: 2 }}>{children}</Box>;
            },
            li({ children }) {
              return <li style={{ marginBottom: '4px' }}>{children}</li>;
            },
            a({ children, href }) {
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                  {children}
                </a>
              );
            },
            blockquote({ children }) {
              return (
                <Box
                  component="blockquote"
                  sx={{
                    borderLeft: '3px solid #004d56',
                    pl: 2,
                    my: 1,
                    color: 'text.secondary',
                    fontStyle: 'italic',
                  }}
                >
                  {children}
                </Box>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        bgcolor: '#474377',
        gap: 2,
        borderRadius: 2,
        my: 1,
        maxWidth:'90%',
        alignSelf: 'flex-end',
      }}
    >
      <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
        {getUserInitials()}
      </Avatar>
      <Box sx={{ color: 'white' }}>
        <Typography sx={{ fontSize: '20px', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;