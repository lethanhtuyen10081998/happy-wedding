import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CachedIcon from '@mui/icons-material/Cached';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoIcon from '@mui/icons-material/Info';
import InsightsIcon from '@mui/icons-material/Insights';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ListIcon from '@mui/icons-material/List';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import LoopIcon from '@mui/icons-material/Loop';
import MailOutlineTwoToneIcon from '@mui/icons-material/MailOutlineTwoTone';
import Settings from '@mui/icons-material/MiscellaneousServices';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PaymentIcon from '@mui/icons-material/Payment';
import PrintIcon from '@mui/icons-material/Print';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ReplyIcon from '@mui/icons-material/Reply';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SaveIcon from '@mui/icons-material/Save';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import Cart from '@mui/icons-material/ShoppingBag';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SortIcon from '@mui/icons-material/Sort';
import StorageIcon from '@mui/icons-material/Storage';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import UndoIcon from '@mui/icons-material/Undo';
import { useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';
import { Camera, Crown, Heart, ShoppingBag, Sparkles } from 'lucide-react';

import Spinner from '../material/Spinner';
import { Email } from './email';
import { Excel } from './excel';
import { Facebook } from './facebook';
import { Google } from './google';
import { Language } from './language';
import { Password } from './password';
import { Phone } from './phone';
import { Plus } from './plus';
import { RegisterForm } from './register-form';
import { RemoveIcon } from './remove';
import { Stock } from './stock';
import { UserInterface } from './user-interface';
import { ViewAll } from './view-all';
import { Visa } from './visa';

const icons = {
  //Material Icons
  'account-circle': AccountCircleOutlinedIcon,
  reply: ReplyIcon,
  mail: MailOutlineTwoToneIcon,
  edit: EditIcon,
  loop: LoopIcon,
  rotate: ScreenRotationIcon,
  'more-vert': MoreVertIcon,
  close: CloseIcon,
  plus: Plus,
  remove: RemoveIcon,
  home: HomeRoundedIcon,
  order: AddShoppingCartRoundedIcon,
  account: AccountCircleRoundedIcon,
  group: GroupsRoundedIcon,
  support: SupportAgentRoundedIcon,
  payment: PaymentIcon,
  check: CheckCircleIcon,
  'warning-circle': ErrorIcon,
  warning: ReportProblemIcon,
  'info-fill': InfoIcon,
  search: SearchIcon,
  sort: SortIcon,
  logout: LogoutIcon,
  view: RemoveRedEyeIcon,
  log: LibraryBooksIcon,
  settings: Settings,
  'order-error': ProductionQuantityLimitsIcon,
  lock: LockIcon,
  unlock: LockOpenIcon,
  up: ArrowUpwardIcon,
  delete: DeleteIcon,
  print: PrintIcon,
  save: SaveIcon,
  copy: ContentCopyIcon,
  cut: ContentCutIcon,
  'air-plane': AirplaneTicketIcon,
  data: StorageIcon,
  list: ListIcon,
  market: StorefrontIcon,
  'market-info': InsightsIcon,
  revenue: CurrencyExchangeIcon,
  export: FileUploadIcon,
  revert: UndoIcon,
  money: AttachMoneyIcon,
  bank: AssuredWorkloadIcon,
  leader: AssistantPhotoIcon,
  reload: CachedIcon,
  receipt: ReceiptIcon,
  'bank-transfer': CreditScoreIcon,
  location: AddLocationIcon,
  calendar: CalendarMonthIcon,
  back: ArrowBackIosIcon,
  send: SendIcon,
  // Custom Icon
  'user-interface': UserInterface,
  cart: Cart,
  phone: Phone,
  password: Password,
  email: Email,
  'register-form': RegisterForm,
  facebook: Facebook,
  google: Google,
  'view-all': ViewAll,
  language: Language,
  stock: Stock,
  visa: Visa,
  excel: Excel,
  ai: SmartToyIcon,
  popular: Sparkles,
  wedding_dress: Crown,
  wedding_photo: Camera,
  wedding_service: ShoppingBag,
  shining_moment: Sparkles,
  shining_moment_photo: Camera,
  shining_moment_dress: Crown,
  heart: Heart,
};

type ColorTypes = 'action' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;

export type IconTypes = keyof typeof icons;

type Props = {
  name: IconTypes;
  width?: string | number;
  height?: string | number;
  sx?: SxProps<Theme>;
  size?: string | number;
  color?: ColorTypes;
  fill?: string;
  loading?: boolean;
};

export const Icon = (props: Props) => {
  const theme = useTheme();
  const { loading, name, ...others } = props;
  const Component: any = icons[name];
  const colors = {
    action: theme.palette.action.active,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    error: theme.palette.error.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  };

  if (loading) {
    return <Spinner size={24} />;
  }

  return <Component {...others} style={{ ...props.sx }} color={others.color && colors[others.color]} />;
};
