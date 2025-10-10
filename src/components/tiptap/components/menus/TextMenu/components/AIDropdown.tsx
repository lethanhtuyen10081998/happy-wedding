import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import TranslateIcon from '@mui/icons-material/Translate';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { languages, tones } from 'src/components/tiptap/lib/constants';

export type AIDropdownProps = {
  onSimplify: () => void;
  onFixSpelling: () => void;
  onMakeShorter: () => void;
  onMakeLonger: () => void;
  onEmojify: () => void;
  onTldr: () => void;
  onTranslate: (language: any) => void;
  onTone: (tone: string) => void;
  onCompleteSentence: () => void;
};

export const AIDropdown = ({
  onCompleteSentence,
  onEmojify,
  onFixSpelling,
  onMakeLonger,
  onMakeShorter,
  onSimplify,
  onTldr,
  onTone,
  onTranslate,
}: AIDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState<null | HTMLElement>(null);
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(anchorEl ? null : event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setSubMenuAnchor(null);
    setLangMenuAnchor(null);
  };

  return (
    <>
      <MenuItem onClick={handleOpen} component='button'>
        <ListItemText>AI Tools</ListItemText>
        <ExpandMoreIcon />
      </MenuItem>

      {/* Main Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={onSimplify}>
          <ListItemIcon>
            <AutoFixHighIcon />
          </ListItemIcon>
          <ListItemText primary='Simplify' />
        </MenuItem>
        <MenuItem onClick={onFixSpelling}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary='Fix spelling & grammar' />
        </MenuItem>
        <MenuItem onClick={onMakeShorter}>
          <ListItemIcon>
            <ShortTextIcon />
          </ListItemIcon>
          <ListItemText primary='Make shorter' />
        </MenuItem>
        <MenuItem onClick={onMakeLonger}>
          <ListItemIcon>
            <FormatSizeIcon />
          </ListItemIcon>
          <ListItemText primary='Make longer' />
        </MenuItem>
        <MenuItem onClick={(e) => setSubMenuAnchor(e.currentTarget)}>
          <ListItemIcon>
            <SubjectIcon />
          </ListItemIcon>
          <ListItemText primary='Change tone' />
          <ExpandMoreIcon />
        </MenuItem>

        <MenuItem onClick={onTldr}>
          <ListItemIcon>
            <MoreHorizIcon />
          </ListItemIcon>
          <ListItemText primary='Tl;dr' />
        </MenuItem>
        <MenuItem onClick={onEmojify}>
          <ListItemIcon>
            <EmojiEmotionsIcon />
          </ListItemIcon>
          <ListItemText primary='Emojify' />
        </MenuItem>
        <MenuItem onClick={(e) => setLangMenuAnchor(e.currentTarget)}>
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          <ListItemText primary='Translate' />
          <ExpandMoreIcon />
        </MenuItem>
        <MenuItem onClick={onCompleteSentence}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary='Complete sentence' />
        </MenuItem>
      </Menu>

      {/* Submenu: Tone Selection */}
      <Menu
        anchorEl={subMenuAnchor}
        open={Boolean(subMenuAnchor)}
        onClose={() => setSubMenuAnchor(null)}
      >
        {tones.map((tone) => (
          <MenuItem key={tone.value} onClick={() => onTone(tone.value)}>
            {tone.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Submenu: Language Selection */}
      <Menu
        anchorEl={langMenuAnchor}
        open={Boolean(langMenuAnchor)}
        onClose={() => setLangMenuAnchor(null)}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.value} onClick={() => onTranslate(lang.value)}>
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
