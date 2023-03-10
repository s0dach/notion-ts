import { Emoji, emojis } from "../components/IconPopup";
export const emojiPath =
  "https://raw.githubusercontent.com/BadaHertz52/notion/master/image/emoji/";
const catImg =
  "https://raw.githubusercontent.com/BadaHertz52/notion/master/src/assests/img/michael-sum-LEpfefQf4rU-unsplash.jpg";
const imgBlockImg =
  "https://raw.githubusercontent.com/BadaHertz52/notion/master/src/assests/img/roses-gfcb7dbdd4_640.jpg";
//TYPE
export const text = "text" as const;
export const toggle = "toggle" as const;
export const todo = "todo" as const;
export const todo_done = "todo done" as const;
export const h1 = "h1" as const;
export const h2 = "h2" as const;
export const h3 = "h3" as const;
export const page = "page" as const;
export const image = "image media" as const;
export const bookmark = "bookmark media" as const;
export const numberList = "numberList" as const;
export const numberListArry = "numberListArry" as const;
export const bulletList = "bulletList" as const;
export const bulletListArry = "bulletListArry" as const;
export const blockTypes = [
  text,
  toggle,
  todo,
  todo_done,
  image,
  bookmark,
  h1,
  h2,
  page,
  numberList,
  bulletList,
];

export type BlockType =
  | typeof text
  | typeof toggle
  | typeof todo
  | typeof todo_done
  | typeof image
  | typeof bookmark
  | typeof h1
  | typeof h2
  | typeof h3
  | typeof page
  | typeof numberList
  | typeof bulletList
  | typeof numberListArry
  | typeof bulletListArry;

export const defaultColor: string = "initial" as const;
export const grey: string = "#bdbdbd" as const;
export const orange: string = "#ffa726" as const;
export const green: string = "#00701a" as const;
export const blue: string = "#1565c0" as const;
export const red: string = "#d32f2f" as const;
export const bg_default: string = "initial" as const;
export const bg_grey: string = "#e0e0e0" as const;
export const bg_yellow: string = "#fff9c4" as const;
export const bg_green: string = "#ebffd7" as const;
export const bg_blue: string = "#e3f2fd" as const;
export const bg_pink: string = "#fce4ec" as const;

export type ColorType =
  | typeof defaultColor
  | typeof grey
  | typeof orange
  | typeof green
  | typeof blue
  | typeof red;
export type BgColorType =
  | typeof bg_default
  | typeof bg_grey
  | typeof bg_yellow
  | typeof bg_green
  | typeof bg_blue
  | typeof bg_pink;

export type BlockStyle = {
  color: ColorType;
  bgColor: BgColorType;
  width: undefined | string;
  height: undefined | string;
};
export const basicBlockStyle: BlockStyle = {
  color: defaultColor,
  bgColor: bg_default,
  width: undefined,
  height: undefined,
};
const userName = "badahertz52";
const editTime = JSON.stringify(Date.now());

const img = "img";
const emoji = "emoji";
export type IconType = typeof img | typeof emoji | null;

export type SubCommentType = {
  id: string;
  userName: string;
  content: string;
  editTime: string;
  createTime: string;
};
export type MainCommentType = SubCommentType & {
  type: "open" | "resolve";
  subComments: SubCommentType[] | null;
  subCommentsId: string[] | null;
};
export type Block = {
  /** ?????? ???????????? block.id ??? `${page.id}_${page.blocks.length}_${editTime}` ?????? */
  id: string;
  contents: string;
  firstBlock: boolean;
  subBlocksId: string[] | null;
  parentBlocksId: string[] | null;
  type: BlockType;
  iconType: IconType;
  icon: string | Emoji | null;
  editTime: string;
  createTime: string;
  style: BlockStyle;
  comments: MainCommentType[] | null;
};

export const blockSample: Block = {
  id: `blockSample_${editTime}`,
  contents: "",
  firstBlock: true,
  subBlocksId: null,
  parentBlocksId: null,
  type: text,
  iconType: null,
  icon: null,
  editTime: editTime,
  createTime: JSON.stringify(Date.now()),
  style: basicBlockStyle,
  comments: null,
};
/**
 * ????????? ????????? ????????? ???????????? ??????
 * @param page  ????????? ????????? ????????? page
 * @param targetBlock  ????????? ????????? ????????? ??? ?????? (????????? ????????? targetBlock??? firstBlock, subBlocksId, parentBlocksId??? ?????? ?????? )
 * @param newBlockContents ????????? ????????? contents ???
 * @returns ????????? ??????
 */
export function makeNewBlock(
  page: Page,
  targetBlock: Block | null,
  newBlockContents: string
): Block {
  const editTime = JSON.stringify(Date.now());
  const blockNumber = page.blocks == null ? 0 : page.blocks.length;
  const newBlock: Block = {
    id: `${page.id}_${blockNumber}_${editTime}`,
    editTime: editTime,
    createTime: editTime,
    type: targetBlock !== null ? targetBlock.type : "text",
    contents: newBlockContents === "<br>" ? "" : newBlockContents,

    firstBlock: targetBlock !== null ? targetBlock.firstBlock : true,
    subBlocksId: targetBlock !== null ? targetBlock.subBlocksId : null,
    parentBlocksId: targetBlock !== null ? targetBlock.parentBlocksId : null,
    iconType: null,
    icon: null,
    style: basicBlockStyle,
    comments: null,
  };
  return newBlock;
}
/**
 * path,page list ??? page??? block date??? ????????? page??? ?????? ????????? ????????? ?????? type
 */
export type listItem = {
  id: string;
  title: string;
  iconType: IconType;
  icon: string | Emoji | null;
  subPagesId: string[] | null;
  parentsId: string[] | null;
  editTime: string;
  createTime: string;
};
const template = "template";
type pageType = typeof page | typeof template;
export type Page = {
  id: string;
  type: pageType;
  header: {
    title: string;
    iconType: IconType;
    icon: string | Emoji | null;
    cover: string | null;
    comments: MainCommentType[] | null;
  };
  firstBlocksId: string[] | null;
  blocks: Block[] | null;
  blocksId: string[] | null;
  subPagesId: string[] | null;
  parentsId: string[] | null;
  editTime: string;
  createTime: string;
};
/**
 * ????????? page??? ???????????? trash????????? page type
 */
type TrashPage = Page & {
  subPages: Page[] | null;
};
export const pageSample: Page = {
  id: editTime,
  type: page,
  header: {
    title: "untitle",
    iconType: null,
    icon: null,
    cover: null,
    comments: null,
  },
  firstBlocksId: null,
  blocks: null,
  blocksId: null,
  subPagesId: null,
  parentsId: null,
  editTime: editTime,
  createTime: editTime,
};
export type Notion = {
  pagesId: string[] | null;
  firstPagesId: string[] | null;
  templatesId: string[] | null;
  pages: Page[] | null;
  trash: {
    pagesId: string[] | null;
    pages: TrashPage[] | null;
  };
};

//action
const ADD_BLOCK = "notion/ADD_BLOCK" as const;
const EDIT_BLOCK = "notion/EDIT_BLOCK" as const;
const CHANGE_BLOCK_TO_PAGE = "notion/CHANGE_BLOCK_TO_PAGE" as const;
const CHANGE_PAGE_TO_BLOCK = "notion/CHANGE_PAGE_TO_BLOCK" as const;
const DELETE_BLOCK = "notion/DELETE_BLOCK" as const;
const CHANGE_TO_SUB_BLOCK = "notion/CHANGE_TO_SUB_BLOCK" as const;
const RAISE_BLOCK = "notion/RAISE_BLOCK" as const;

const ADD_PAGE = "notion/ADD_PAGE" as const;
const DUPLICATE_PAGE = "notion/DUPLICATE_PAGE" as const;
const EDIT_PAGE = "notion/EDIT_PAGE" as const;
const MOVE_PAGE_TO_PAGE = "notion/MOVE_PAGE_TO_PAGE" as const;
const DELETE_PAGE = "notion/DELETE_PAGE" as const;
const RESTORE_PAGE = "notion/RESTORE_PAGE" as const;
const CLEAN_TRASH = "notion/CLEAN_TRASH" as const;

const ADD_TEMPLATE = "notion/ADD_TEMPLATE" as const;
const CANCLE_EDIT_TEMPLATE = "notino/CANCLE_EDIT_TEMPLATE" as const;
const DELETE_TEMPLATE = "notion/DELETE_TEMPLATE" as const;
/**
 * page??? ????????? block??? ???????????? ????????????
 * @param pageId block??? ????????? page??? id
 * @param block  ????????? block
 * @param newBlockIndex  page.blocksId ??? page.blocks??? ????????? ????????? index
 * @param previousBlockId ????????? ????????? ?????? ????????? ??????????????? ?????? , ??????????????? ????????? ????????? ?????? ????????? ????????? block??? id
 * @returns
 */
export const add_block = (
  pageId: string,
  block: Block,
  newBlockIndex: number,
  previousBlockId: string | null
) => ({
  type: ADD_BLOCK,
  pageId: pageId,
  block: block,
  newBlockIndex: newBlockIndex,
  /**????????? ????????? ????????? ??? ??????  */
  previousBlockId: previousBlockId,
});
export const edit_block = (pageId: string, block: Block) => ({
  type: EDIT_BLOCK,
  pageId: pageId,
  /**????????? block*/
  block: block,
});
export const change_block_to_page = (currentPageId: string, block: Block) => ({
  type: CHANGE_BLOCK_TO_PAGE,
  pageId: currentPageId,
  /** page type ?????? ????????? block */
  block: block,
});
export const change_page_to_block = (currentPageId: string, block: Block) => ({
  type: CHANGE_PAGE_TO_BLOCK,
  pageId: currentPageId,
  /** page type ?????? ?????? blockType ?????? ????????? block */
  block: block,
});
export const delete_block = (
  pageId: string,
  block: Block,
  isInMenu: boolean
) => ({
  type: DELETE_BLOCK,
  pageId: pageId,
  /** ????????? block */
  block: block,
  /** block ????????? menu??? delete ??? ???????????? ??????  */
  isInMenu: isInMenu,
});
/**
 * block??? ??????????????? ?????? ????????? block??? subBlock?????? ???????????? ????????????
 * @param pageId  : ?????? ???????????? id
 * @param block : subBlock ?????? ????????? block
 * @param newParentBlockId : subBlock??? ??? block??? ????????? parentBlock??? id
 * @returns
 */
export const change_to_sub = (
  pageId: string,
  block: Block,
  newParentBlockId: string
) => ({
  type: CHANGE_TO_SUB_BLOCK,
  pageId: pageId,
  block: block,
  newParentBlockId: newParentBlockId,
});
/**
 * block??? ??????????????? block??? content ???????????? backspace ??? ????????? ??????, block??? ????????? ??????????????? block??? ?????? ????????? ?????? ?????? block??? ????????? ???????????????, ????????? ????????? ??????????????? ?????? ?????? ??????
 * @param pageId ?????? ???????????? id
 * @param block  ????????? ??????????????? ????????? ????????? block
 * @returns
 */
export const raise_block = (pageId: string, block: Block) => ({
  type: RAISE_BLOCK,
  pageId: pageId,
  block: block,
});

export const add_page = (newPage: Page) => ({
  type: ADD_PAGE,
  pageId: "0", // ?????????????????? ?????? ????????????????????? ????????? ?????? ?????? ?????????
  newPage: newPage,
  block: null,
});

export const duplicate_page = (targetPageId: string) => ({
  type: DUPLICATE_PAGE,
  pageId: targetPageId,
  block: null,
});
export const edit_page = (pageId: string, newPage: Page) => ({
  type: EDIT_PAGE,
  pageId: pageId,
  newPage: newPage,
  block: null,
});
/**
 * ???????????? ?????? ???????????? ??????(blockType :page)?????? ???????????? ????????????
 * @param targetPageId ???????????? ?????????
 * @param destinationPageId ???????????? ????????? ?????????
 * @returns
 */
export const move_page_to_page = (
  targetPageId: string,
  destinationPageId: string
) => ({
  type: MOVE_PAGE_TO_PAGE,
  pageId: targetPageId,
  destinationPageId: destinationPageId,
  block: null,
});
export const delete_page = (pageId: string) => ({
  type: DELETE_PAGE,
  pageId: pageId,
  block: null,
});
/**
 * ???????????? trash??? ????????? page??? ?????? notion.pages??? ???????????? ????????????
 * @param pageId
 * @returns
 */
export const restore_page = (pageId: string) => ({
  type: RESTORE_PAGE,
  pageId: pageId,
  block: null,
});
/** trash??? data??? ???????????? ???????????? */
export const clean_trash = (pageId: string) => ({
  type: CLEAN_TRASH,
  pageId: pageId,
  block: null,
});
/**
 * ????????? template ??? ????????? ????????????
 * @param
 * @returns
 */
export const add_template = (template: Page) => ({
  type: ADD_TEMPLATE,
  pageId: template.id,
  template: template,
  block: null,
});
/**
 * template??? ????????? ??????, ???????????? ???????????? ????????? template??? ???????????? ????????? ??????  template??? date??? ?????? ????????? ???????????? ????????????
 * @param templateId ??????????????? template??? id
 * @returns
 */
export const cancle_edit_template = (templateId: string) => ({
  type: CANCLE_EDIT_TEMPLATE,
  pageId: templateId,
  block: null,
});
/**
 * template??? ???????????? ?????? ??????
 * @param templateId ??????????????? template??? id
 * @returns
 */
export const delete_template = (templateId: string) => ({
  type: DELETE_TEMPLATE,
  pageId: templateId,
  block: null,
});
type NotionAction =
  | ReturnType<typeof add_block>
  | ReturnType<typeof edit_block>
  | ReturnType<typeof change_block_to_page>
  | ReturnType<typeof change_page_to_block>
  | ReturnType<typeof delete_block>
  | ReturnType<typeof change_to_sub>
  | ReturnType<typeof raise_block>
  | ReturnType<typeof add_page>
  | ReturnType<typeof duplicate_page>
  | ReturnType<typeof edit_page>
  | ReturnType<typeof move_page_to_page>
  | ReturnType<typeof delete_page>
  | ReturnType<typeof restore_page>
  | ReturnType<typeof clean_trash>
  | ReturnType<typeof add_template>
  | ReturnType<typeof cancle_edit_template>
  | ReturnType<typeof delete_template>;

const day = [
  "Mon",
  "1",
  "Ths",
  "2",
  "Wed",
  "3",
  "Thr",
  "4",
  "Fri",
  "5",
  "Sat",
  "6",
  "Sun",
];
const blockBgColor = [
  bg_blue,
  "",
  bg_green,
  "",
  bg_yellow,
  "",
  bg_pink,
  "",
  bg_grey,
  "",
  bg_yellow,
  "",
  bg_blue,
];
const todoList = [
  "6AM :???? runing",
  "9AM:????physical checkup",
  "???? Webtoon re-enactment",
  "8PM: ????Buying food ingredients in mart - sale",
  "6PM :???? dinner appointment with friend",
  "Dry cleaning at the dry cleaner",
  "house cleaning",
];

const returnTemplateSubBlock = (day: string, index: number) => {
  const num = index / 2;
  const templateBlock: Block = {
    id: `templateSub_${day}`,
    contents: todoList[num],

    firstBlock: false,
    subBlocksId: null,
    parentBlocksId: [`templateBlock_${day}`],
    type: todo,
    iconType: null,
    icon: null,
    editTime: editTime,
    createTime: JSON.stringify(Date.now()),
    style: basicBlockStyle,
    comments: null,
  };
  return templateBlock;
};

const returnTemplateBlock = (day: string, index: number) => {
  const templateBlock: Block = {
    id: `templateBlock_${day}`,
    contents: `${day}`,

    firstBlock: true,
    subBlocksId: [`templateSub_${day}`],
    parentBlocksId: null,
    type: h3,
    iconType: null,
    icon: null,
    editTime: editTime,
    createTime: JSON.stringify(Date.now()),
    style: {
      ...basicBlockStyle,
      bgColor: blockBgColor[index],
    },
    comments: null,
  };
  return templateBlock;
};
const templateBlocks = day.map((d: string) => {
  let returnBlock: Block;
  if (day.indexOf(d) % 2 === 0) {
    returnBlock = returnTemplateBlock(d, day.indexOf(d));
  } else {
    returnBlock = {
      ...blockSample,
      id: `empty${d}_${JSON.stringify(Date.now())}`,
    };
  }
  return returnBlock;
});

const templateBlocksId = templateBlocks.map((block: Block) => block.id);
const templateSubBlocks = day.map((d: string) =>
  returnTemplateSubBlock(d, day.indexOf(d))
);
const templateSubBlocksId = day.map((d: string) => `templateSub_${d}`);
//reducer
const template1: Page = {
  id: "template1",
  type: template,
  header: {
    title: "To Do List ",
    iconType: "emoji",
    icon: emojis[13],
    cover: null,
    comments: null,
  },
  firstBlocksId: templateBlocksId,
  blocks: [...templateBlocks, ...templateSubBlocks],
  blocksId: [...templateBlocksId, ...templateSubBlocksId],
  subPagesId: null,
  parentsId: null,
  editTime: Date.parse("2022-8-23-15:00").toString(),
  createTime: Date.parse("2022-8-23-12:00").toString(),
};
const template2: Page = {
  id: "template2",
  type: template,
  header: {
    title: "To Do List2 ",
    iconType: "emoji",
    icon: emojis[19],
    cover: null,
    comments: null,
  },
  firstBlocksId: ["template2_block1"],
  blocks: [
    {
      id: `template2_block1`,
      contents: "check meeting",
      firstBlock: true,
      subBlocksId: null,
      parentBlocksId: null,
      type: todo,
      iconType: null,
      icon: null,
      editTime: editTime,
      createTime: JSON.stringify(Date.now()),
      style: basicBlockStyle,
      comments: null,
    },
  ],
  blocksId: ["template2_block1"],
  subPagesId: null,
  parentsId: null,
  editTime: Date.parse("2022-8-23-15:00").toString(),
  createTime: Date.parse("2022-8-23-12:00").toString(),
};
// const initialState :Notion ={
//   pagesId:null ,
//   firstPagesId:null,
//   templatesId:null,
//   pages:null,
//   trash:{
//     pages:null,
//     pagesId:null
//   }
// }
const initialState: Notion = {
  pagesId: ["12345", "page1", "page2", "1234", "123", "template1", "template2"],
  firstPagesId: ["12345", "1234", "123"],
  templatesId: ["template1", "template2"],
  pages: [
    {
      id: "12345",
      type: page,
      header: {
        title: "welcome notion ????",
        iconType: "img",
        icon: catImg,
        cover: null,
        comments: [
          {
            id: "comment_1",
            userName: userName,
            type: "open",
            content: "this is page comment",
            editTime: Date.parse("2022-5-20-12:00").toString(),
            createTime: Date.parse("2022-5-20-12:00").toString(),
            subComments: null,
            subCommentsId: null,
          },
        ],
      },
      firstBlocksId: [
        "text",
        "img",
        "toggle",
        "todo",
        "todo done",
        "h1",
        "h2",
        "h3",
        "page1",
        "page2",
        "numberList",
        "bulletList",
      ],
      blocks: [
        {
          id: "text",
          contents: "test",
          firstBlock: true,
          subBlocksId: ["sub1_1", "sub1_2"],
          parentBlocksId: null,
          type: text,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-18-15:00").toString(),
          createTime: Date.parse("2022-5-18-1:00").toString(),
          style: {
            ...basicBlockStyle,
            color: blue,
            bgColor: bg_default,
          },
          comments: [
            {
              id: "comment_text1",
              userName: userName,
              type: "open",
              content: "hi! ??????",
              editTime: (1654086822451).toString(),
              createTime: Date.parse("2022-5-20-15:00").toString(),
              subComments: null,
              subCommentsId: null,
            },
          ],
        },
        {
          id: "img",
          contents: imgBlockImg,
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: image,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-18-16:00").toString(),
          createTime: Date.parse("2022-5-18-2:00").toString(),
          style: {
            ...basicBlockStyle,
            width: "222px",
            height: "auto",
          },
          comments: null,
        },
        {
          id: "toggle",
          contents: "Try press toggle btn",
          firstBlock: true,
          subBlocksId: ["toggleSub"],
          parentBlocksId: null,
          type: toggle,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-18-16:00").toString(),
          createTime: Date.parse("2022-5-18-2:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
        {
          id: "toggleSub",
          contents: "Hi!???? ",
          firstBlock: false,
          subBlocksId: null,
          parentBlocksId: ["toggle"],
          type: text,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-18-16:10").toString(),
          createTime: Date.parse("2022-5-18-2:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
        {
          id: "todo",
          contents: "todo",
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: todo,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-18-16:01:00").toString(),
          createTime: Date.parse("2022-5-18-3:00").toString(),
          style: {
            ...basicBlockStyle,
            bgColor: bg_yellow,
          },
          comments: [
            {
              id: "comment_todo1",
              userName: userName,
              type: "open",
              content: "todo comments",
              editTime: Date.parse("2022-5-18-16:01:30").toString(),
              createTime: Date.parse("2022-5-21-14:00").toString(),
              subComments: null,
              subCommentsId: null,
            },
          ],
        },
        {
          id: "todo done",
          contents: "todo done",
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: todo_done,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-19-11:30").toString(),
          createTime: Date.parse("2022-5-18-5:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
        {
          id: "h1",
          contents:
            'head<a class="link" target="_blank" href="https://github.com/BadaHertz52">er</a><span class=" color color_blue">1</span></span>',
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: h1,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-19-12:00").toString(),
          createTime: Date.parse("2022-5-18-15:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
        {
          id: "h2",
          contents: "header2",
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: h2,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-18-20:00").toString(),
          createTime: Date.parse("2022-5-18-15:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
        {
          id: "h3",
          contents: "header3",
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: h3,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-19-19:20").toString(),
          createTime: Date.parse("2022-5-18-15:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
        {
          id: "page1",
          contents: "page page page",
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: page,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-20-21:00").toString(),
          createTime: Date.parse("2022-5-19-15:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
        {
          id: "page2",
          contents: "page2",
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: page,
          iconType: "emoji",
          icon: emojis[8],
          editTime: Date.parse("2022-5-20-9:00").toString(),
          createTime: Date.parse("2022-5-19-20:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
        {
          id: "sub1_1",
          contents: "sub1_1",
          firstBlock: false,
          subBlocksId: ["sub2_1"],
          parentBlocksId: ["text"],
          type: text,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-6-1-1:00").toString(),
          createTime: Date.parse("2022-5-30-15:00").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: null,
        },
        {
          id: "sub1_2",
          contents: "sub1_2",
          firstBlock: false,
          subBlocksId: null,
          parentBlocksId: ["text"],
          type: text,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-12-09:00").toString(),
          createTime: Date.parse("2022-5-12-08:50").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: [
            {
              id: "comment_sub1_2_1",
              userName: userName,
              type: "open",
              content: "subBlock comments",
              editTime: Date.parse("2022-5-18-8:00").toString(),
              createTime: Date.parse("2022-5-18-8:00").toString(),
              subComments: null,
              subCommentsId: null,
            },
          ],
        },
        {
          id: "sub2_1",
          contents: "sub2_1",
          firstBlock: false,
          subBlocksId: null,
          parentBlocksId: ["text", "sub1_1"],
          type: text,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-27-7:00").toString(),
          createTime: Date.parse("2022-5-27-7:00").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: null,
        },
        {
          id: "numberList",
          contents: "",
          firstBlock: true,
          subBlocksId: ["num1", "num2", "num3"],
          parentBlocksId: null,
          type: numberListArry,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-6-1-18:45").toString(),
          createTime: Date.parse("2022-6-1-18:45").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: null,
        },
        {
          id: "num1",
          contents: "n1",
          firstBlock: false,
          subBlocksId: null,
          parentBlocksId: [numberList],
          type: numberList,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-6-1-19:03").toString(),
          createTime: Date.parse("2022-6-1-19:03").toString(),
          style: {
            ...basicBlockStyle,
            bgColor: bg_green,
          },
          comments: null,
        },
        {
          id: "num2",
          contents: "n2",
          firstBlock: false,
          subBlocksId: null,
          parentBlocksId: [numberList],
          type: numberList,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-6-1-19:03:50").toString(),
          createTime: Date.parse("2022-6-1-19:03:50").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: [
            {
              id: "comment_n2",
              userName: userName,
              type: "open",
              content: "comment n2",
              editTime: (1654086822451).toString(),
              createTime: (1654086822451).toString(),
              subComments: null,
              subCommentsId: null,
            },
          ],
        },
        {
          id: "num3",
          contents: "n3",
          firstBlock: false,
          subBlocksId: null,
          parentBlocksId: [numberList],
          type: numberList,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-6-1-19:12:13").toString(),
          createTime: Date.parse("2022-6-1-19:12:13").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: null,
        },
        {
          id: "bulletList",
          contents: "",
          firstBlock: true,
          subBlocksId: ["b1", "b2"],
          parentBlocksId: null,
          type: bulletListArry,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-6-1-19:13:45").toString(),
          createTime: Date.parse("2022-6-1-19:13:45").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: null,
        },
        {
          id: "b1",
          contents: "b1",
          firstBlock: false,
          subBlocksId: null,
          parentBlocksId: [bulletList],
          type: bulletList,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-6-1-19:23").toString(),
          createTime: Date.parse("2022-6-1-19:23").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: null,
        },
        {
          id: "b2",
          contents: "b2",
          firstBlock: false,
          subBlocksId: null,
          parentBlocksId: [bulletList],
          type: bulletList,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-6-1-20:12").toString(),
          createTime: Date.parse("2022-6-1-20:12").toString(),
          style: {
            ...basicBlockStyle,
          },
          comments: null,
        },
      ],
      blocksId: [
        "text",
        "img",
        "toggle",
        "toggleSub",
        "todo",
        "todo done",
        "h1",
        "h2",
        "h3",
        "page1",
        "page2",
        "sub1_1",
        "sub1_2",
        "sub2_1",
        "numberList",
        "num1",
        "num2",
        "num3",
        "bulletList",
        "b1",
        "b2",
      ],
      subPagesId: ["page1", "page2"],
      parentsId: null,
      editTime: Date.parse("2022-5-10-15:00").toString(),
      createTime: Date.parse("2022-5-10-15:00").toString(),
    },
    {
      ...pageSample,
      id: "page1",
      header: {
        ...pageSample.header,
        title: "page page page",
      },
      blocks: [
        {
          id: "img",
          contents: imgBlockImg,
          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: image,
          iconType: null,
          icon: null,
          editTime: Date.parse("2022-5-18-16:00").toString(),
          createTime: Date.parse("2022-5-18-2:00").toString(),
          style: basicBlockStyle,
          comments: null,
        },
      ],
      blocksId: ["img"],
      firstBlocksId: ["img"],
      editTime: Date.parse("2022-5-10-21:00").toString(),
      createTime: Date.parse("2022-5-10-21:00").toString(),
      parentsId: ["12345"],
    },
    {
      ...pageSample,
      id: "page2",
      header: {
        ...pageSample.header,
        iconType: "emoji",
        icon: emojis[8],
        title: "page2",
      },
      editTime: JSON.stringify(Date.parse("2022-5-20-9:00")),
      createTime: JSON.stringify(Date.parse("2022-5-20-9:00")),
      parentsId: ["12345"],
    },
    {
      id: "1234",
      type: page,
      header: {
        title: "notion2",
        iconType: "emoji",
        icon: emojis[2],
        cover: null,
        comments: null,
      },
      firstBlocksId: null,
      blocks: null,
      blocksId: null,
      subPagesId: null,
      parentsId: null,
      editTime: JSON.stringify(Date.parse("2022-5-13-19:00")),
      createTime: JSON.stringify(Date.parse("2022-5-13-19:00")),
    },
    {
      id: "123",
      type: page,
      header: {
        title: "notion3",
        iconType: "emoji",
        icon: emojis[10],
        cover: null,
        comments: null,
      },
      firstBlocksId: null,
      blocks: null,
      blocksId: null,
      subPagesId: null,
      parentsId: null,
      editTime: JSON.stringify(Date.parse("2022-5-22-15:00")),
      createTime: JSON.stringify(Date.parse("2022-5-22-15:00")),
    },
    template1,
    template2,
  ],
  trash: {
    pagesId: null,
    pages: null,
  },
};
/**
 *  block content??? ?????? ????????? ????????? ????????? ???????????? ?????? ???????????? ???????????? ??????
 * @param block
 * @returns
 */
export const getBlockText = (block: Block) => {
  const contentEditableHtml = document.getElementById(
    `${block.id}_contents`
  )?.firstElementChild;
  let text = "";
  if (contentEditableHtml !== null && contentEditableHtml !== undefined) {
    const children = [...contentEditableHtml.childNodes];
    let contentsArry: string[] = [];
    children.forEach((c: Node) => {
      if (c.nodeType === 3) {
        c.nodeValue !== null && contentsArry.push(c.nodeValue);
      }
      if (c.nodeType === 1) {
        const element = c as HTMLElement;
        contentsArry.push(element.innerText);
      }
    });
    text = contentsArry.join("");
  }
  return text;
};
/**
 * block.id??? block??? ?????? ??? ?????? ??????
 * @param page ?????? block??? ???????????? ?????????
 * @param blockId ?????? block??? ?????????
 * @returns index: block??? page.blocks????????? index, BLOCK: ?????? block
 */
export function findBlock(
  page: Page,
  blockId: string
): { index: number; BLOCK: Block } {
  let index = 0;
  let block = blockSample;
  if (page.blocks !== null && page.blocksId !== null) {
    index = page.blocksId.indexOf(blockId);
    block = page.blocks[index];
  } else {
    console.log(
      `page(id:${page.id}, title:${page.header.title}) doesn't have blocks`
    );
  }

  return {
    index: index,
    BLOCK: block,
  };
}
/**
 * subBlock ??? ?????? ????????? parentBlock??? ?????? ??????
 * @param page subBlock??? ???????????? page
 * @param subBlock  parentBlock??? ????????? ????????? ?????? subBlock
 * @returns parentBlockIndex: parentBlock??? page.blocks????????? index, parentBloc: ????????? ??? parentBlock
 */
export function findParentBlock(
  page: Page,
  subBlock: Block
): { parentBlockIndex: number; parentBlock: Block } {
  const parentBlocksId = subBlock.parentBlocksId as string[];
  const last: number = parentBlocksId.length - 1;
  const parentBlockId = parentBlocksId[last];
  const { index, BLOCK } = findBlock(page, parentBlockId);
  return {
    parentBlockIndex: index,
    parentBlock: BLOCK,
  };
}
export const findPage = (
  pagesId: string[],
  pages: Page[],
  pageId: string
): Page | TrashPage => {
  const index: number = pagesId.indexOf(pageId);
  const PAGE: Page | TrashPage = pages[index];
  return PAGE;
};

/**
 * ????????? ?????? block(=@param block)??? ?????? ?????? block(=previousBlockInDoc)??? ?????? ??????
 * @param page ?????? ?????????
 * @param block  previousBlock??? ????????? ?????? block
 * @returns  block??? ?????? ?????? previousBlock??? previsousBlockIndex(=page.blocksId.indexOf(previsousBlock.id))
 */
export const findPreviousBlockInDoc = (
  page: Page,
  block: Block
): { previousBlockInDoc: Block; previousBlockInDocIndex: number } => {
  let previousBlockInDoc = blockSample;
  let previousBlockIndex = 0;
  const findLastSubBLOCK = (targetBlock: Block) => {
    if (targetBlock.subBlocksId !== null) {
      const lastSubBlockId =
        targetBlock.subBlocksId[targetBlock.subBlocksId.length - 1];
      const { BLOCK, index } = findBlock(page, lastSubBlockId);
      if (BLOCK.subBlocksId == null) {
        previousBlockInDoc = BLOCK;
        previousBlockIndex = index;
      } else {
        findLastSubBLOCK(BLOCK);
      }
    }
  };
  if (page.firstBlocksId !== null) {
    if (block.firstBlock) {
      const blockIndexAsFirstBlock = page.firstBlocksId.indexOf(block.id);
      const previousFirstBlockId =
        page.firstBlocksId[blockIndexAsFirstBlock - 1];
      const { BLOCK, index } = findBlock(page, previousFirstBlockId);
      const previousFirstBlock = BLOCK;
      const previousFirstBlockIndex = index;
      if (previousFirstBlock.subBlocksId === null) {
        previousBlockInDoc = previousFirstBlock;
        previousBlockIndex = previousFirstBlockIndex;
      } else {
        findLastSubBLOCK(previousFirstBlock);
      }
    }
    if (!block.firstBlock) {
      const { parentBlock, parentBlockIndex } = findParentBlock(page, block);
      if (parentBlock.subBlocksId !== null) {
        const blockIndexAsSubBlock = parentBlock.subBlocksId.indexOf(block.id);
        if (blockIndexAsSubBlock === 0) {
          previousBlockInDoc = parentBlock;
          previousBlockIndex = parentBlockIndex;
        } else {
          const previousSubBlockId =
            parentBlock.subBlocksId[blockIndexAsSubBlock - 1];
          const { BLOCK, index } = findBlock(page, previousSubBlockId);
          const previousSubBlock = BLOCK;
          if (previousSubBlock.subBlocksId == null) {
            previousBlockInDoc = previousSubBlock;
            previousBlockIndex = index;
          } else {
            findLastSubBLOCK(previousSubBlock);
          }
        }
      }
    }
  }
  return {
    previousBlockInDoc: previousBlockInDoc,
    previousBlockInDocIndex: previousBlockIndex,
  };
};
export default function notion(
  state: Notion = initialState,
  action: NotionAction
): Notion {
  const pagesId = state.pagesId !== null ? [...state.pagesId] : null;
  const firstPagesId =
    state.firstPagesId !== null ? [...state.firstPagesId] : null;
  const templatesId = state.templatesId == null ? null : [...state.templatesId];
  const pages = state.pages !== null ? [...state.pages] : null;
  let trash = {
    pagesId: state.trash.pagesId ? [...state.trash.pagesId] : null,
    pages: state.trash.pages ? [...state.trash.pages] : null,
  };
  const pageIndex: number =
    action.type !== RESTORE_PAGE
      ? (pagesId?.indexOf(action.pageId) as number)
      : (trash.pagesId?.indexOf(action.pageId) as number);
  const targetPage: Page | TrashPage | null =
    action.type !== RESTORE_PAGE
      ? pages !== null
        ? (pages[pageIndex] as Page)
        : null
      : trash.pages !== null
      ? (trash.pages[pageIndex] as TrashPage)
      : null;

  /**
   * block data ?????? , block??? parentBlock?????? subBlocks??? ????????? ?????? ?????? ?????? parentBlock?????? subBlock??? ???????????????
   * @param index  targetPage.blocks ????????? block??? index
   * @param block  ????????? data??? ?????? block
   */
  const editBlockData = (index: number, block: Block) => {
    targetPage?.blocks?.splice(index, 1, block);
    //firstBlock ????????? ?????? page.firstBlocksId ????????? editPage???
  };
  /**
   * subBlock ?????? ?????? subBlock??? parentBlock??? ?????? ?????? ?????? (parentBlock.subBlocksId ??????)
   * @param subBlock  ?????? ?????? subBlock
   * @param previousBlockId ?????? ?????? subBlock??? parentBlock.subBlocksId??? index??? ???????????? ?????? param ,?????? ?????? subBlock ?????? ?????? ?????? subBlock??? ?????? ????????? ?????? ?????? subBlock = previoustBlock
   */
  const updateParentBlock = (
    subBlock: Block,
    previousBlockId: string | null
  ) => {
    if (subBlock.parentBlocksId !== null && targetPage !== null) {
      //find parentBlock
      const { parentBlockIndex, parentBlock } = findParentBlock(
        targetPage,
        subBlock
      );

      const subBlocksId = parentBlock.subBlocksId;
      if (subBlocksId !== null) {
        const previousBlockIndex =
          previousBlockId === null
            ? -1
            : (subBlocksId.indexOf(previousBlockId) as number);

        subBlocksId.splice(previousBlockIndex + 1, 0, subBlock.id);
      }

      //edit parentBlock
      const editedParentBlock: Block = {
        ...parentBlock,
        subBlocksId: subBlocksId !== null ? subBlocksId : [subBlock.id],
      };
      //update parentBlock
      targetPage?.blocks?.splice(parentBlockIndex, 1, editedParentBlock);
    } else {
      console.log("can't find parentBlocks of this block");
    }
  };

  /**
   * block.firstBlock== true??? block??? ????????? ??????, page??? firstBlocksId ???????????? ??????
   * @param page ?????? ?????????
   * @param block ????????? block
   */
  const editFirstBlocksId = (page: Page, block: Block) => {
    if (block.firstBlock && page.firstBlocksId !== null) {
      const firstIndex: number = page.firstBlocksId.indexOf(block.id) as number;
      if (block.subBlocksId !== null) {
        if (firstIndex === 0) {
          page.firstBlocksId = [
            ...block.subBlocksId,
            ...page.firstBlocksId?.slice(1),
          ];
        } else {
          const pre = page.firstBlocksId.slice(0, firstIndex);
          if (firstIndex === page.firstBlocksId.length - 1) {
            page.firstBlocksId = pre.concat(block.subBlocksId);
          } else {
            const after = page.firstBlocksId.slice(firstIndex + 1);
            page.firstBlocksId = pre.concat(block.subBlocksId).concat(after);
          }
        }
      }
      if (block.subBlocksId == null) {
        page.firstBlocksId.splice(firstIndex, 1);
      }
    }
  };
  /**
   * block??? ???????????????, ????????? ???????????????, ?????? block??? ???????????? ?????? ????????? subBlock??? parentBlocksId ??? ???????????? ??????
   * @param page  ?????? ?????????
   * @param block  ??????,??????????????? ?????? ????????? ???????????? ??????
   * @param blockDelete  raise?????? ????????? ????????? ?????????????????? ??????
   */
  const raiseSubBlock = (page: Page, block: Block, blockDelete: boolean) => {
    if (block.subBlocksId !== null) {
      // ?????? ?????? : ?????? ??? , ???????????? block ??? firstBlock ?????? subBlock ??? firstBlock ??? ?????? ????????? ????????? ?????? ????????? subBlock??? ???

      const subBlocks: Block[] = block.subBlocksId.map((id: string) => {
        const BLOCK = findBlock(page, id).BLOCK;
        return BLOCK;
      });
      subBlocks.forEach((subBlock: Block) => {
        if (subBlock.parentBlocksId !== null) {
          const raisedSubBlock: Block = {
            ...subBlock,
            parentBlocksId: blockDelete
              ? block.parentBlocksId
              : subBlock.parentBlocksId.slice(1),
            firstBlock: blockDelete ? block.firstBlock : false,
            editTime: editTime,
          };
          const index = page.blocksId?.indexOf(subBlock.id) as number;
          editBlockData(index, raisedSubBlock);
          subBlock.subBlocksId !== null &&
            raiseSubBlock(page, subBlock, blockDelete);
        }
      });
      //block ????????? page firstBlockId ????????? ?????? (sub=sub????????? ???????????? ????????? sub??? ?????? )
    }
  };
  /**
   * raiseBlock?????? ?????? block??? ????????? ????????? ?????? block??? ????????? ??????, ?????? block??? subBlocks??? parentsBlocksId??? ???????????? subBlocks??? firstBlock??? ??? ?????? page.firstBlocksId??? ???????????? ??????
   * @param page ?????? ?????????
   * @param block   ????????? block, ????????? subBlocks??? parentBlock
   */
  const updateNewParentAndFirstBlocksIdAfterRaise = (
    page: Page,
    block: Block
  ) => {
    const subBlocksId = block.subBlocksId;
    if (subBlocksId !== null && block.parentBlocksId !== null) {
      const { parentBlock, parentBlockIndex } = findParentBlock(page, block);
      let parentSubsId = parentBlock.subBlocksId as string[];
      const index = parentSubsId.indexOf(block.id);
      if (index === 0) {
        parentSubsId = [...subBlocksId];
      } else {
        if (index === parentSubsId.length - 1) {
          parentSubsId = parentSubsId.slice(0, index).concat(subBlocksId);
        } else {
          const pre = parentSubsId.slice(0, index);
          const after = parentSubsId.slice(index + 1);
          parentSubsId = pre.concat(subBlocksId).concat(after);
        }
      }
      const newParentBlock: Block = {
        ...parentBlock,
        subBlocksId: parentSubsId,
        editTime: editTime,
      };
      editBlockData(parentBlockIndex, newParentBlock);
    }
    editFirstBlocksId(page, block);
  };
  /**
   * page?????? block ??? data??? ???????????? ??????
   * @param page :?????? ?????????
   * @param block :?????? ????????? block
   */
  const deleteBlockData = (page: Page, block: Block) => {
    const index = page.blocksId?.indexOf(block.id) as number;
    if (block.firstBlock && page.firstBlocksId !== null) {
      const firstIndex = page.firstBlocksId.indexOf(block.id);
      block.firstBlock &&
        firstIndex >= 0 &&
        page.firstBlocksId?.splice(firstIndex, 1);
    }
    page.blocks?.splice(index, 1);
    page.blocksId?.splice(index, 1);
  };
  function addPage(newPage: Page) {
    if (pagesId !== null && pages !== null && firstPagesId !== null) {
      pagesId.push(newPage.id);
      pages.push(newPage);
      if (newPage.parentsId == null) {
        //firstPage ?????????
        firstPagesId.push(newPage.id);
      } else {
        const parentPage: Page = findPage(
          pagesId,
          pages,
          newPage.parentsId[newPage.parentsId.length - 1]
        );
        const parentPageIndex = pagesId.indexOf(parentPage.id);
        const editedParentPage: Page = {
          ...parentPage,
          subPagesId:
            parentPage.subPagesId !== null
              ? parentPage.subPagesId.concat(newPage.id)
              : [newPage.id],
        };

        pages.splice(parentPageIndex, 1, editedParentPage);
      }
    }
  }
  if (
    targetPage !== null &&
    pagesId !== null &&
    pages !== null &&
    firstPagesId !== null
  ) {
    const blockIndex: number =
      action.block !== null
        ? (pages[pageIndex]?.blocksId?.indexOf(action.block.id) as number)
        : (0 as number);
    switch (action.type) {
      case ADD_BLOCK:
        if (action.newBlockIndex === 0) {
          // ????????? ????????? page ??? ????????? ????????? ??????
          targetPage.blocks =
            targetPage.blocks !== null
              ? [action.block, ...targetPage.blocks]
              : [action.block];
          targetPage.blocksId =
            targetPage.blocksId !== null
              ? [action.block.id, ...targetPage.blocksId]
              : [action.block.id];
        } else {
          targetPage.blocks?.splice(action.newBlockIndex, 0, action.block);
          targetPage.blocksId?.splice(action.newBlockIndex, 0, action.block.id);
        }

        if (action.block.firstBlock) {
          if (targetPage.firstBlocksId !== null) {
            if (action.previousBlockId !== null) {
              const firstIndex = targetPage.firstBlocksId.indexOf(
                action.previousBlockId
              );
              targetPage.firstBlocksId.splice(
                firstIndex + 1,
                0,
                action.block.id
              );
            } else {
              if (action.newBlockIndex === 0) {
                targetPage.firstBlocksId = [
                  action.block.id,
                  ...targetPage.firstBlocksId,
                ];
              } else {
                targetPage.firstBlocksId = targetPage.firstBlocksId.concat(
                  action.block.id
                );
              }
            }
          } else {
            targetPage.firstBlocksId = [action.block.id];
          }
        } else {
          //subBlock ?????? ????????? ?????? ???
          if (action.block.parentBlocksId !== null) {
            updateParentBlock(action.block, action.previousBlockId);
          }
        }

        if (
          action.block.subBlocksId !== null &&
          action.previousBlockId !== null
        ) {
          // subBlock??? ????????? ????????? ???????????? ??? ?????? ???????????? ???????????? ??????
          const previousBlock = findBlock(
            targetPage,
            action.previousBlockId
          ).BLOCK;
          previousBlock.subBlocksId = null;

          action.block.subBlocksId.forEach((id: string) => {
            const BLOCK = findBlock(targetPage, id).BLOCK;
            const parentIndex = BLOCK.parentBlocksId?.indexOf(
              action.previousBlockId as string
            );
            parentIndex !== undefined &&
              BLOCK.parentBlocksId?.splice(parentIndex, 1, action.block.id);
          });
        }
        //?????? ???????????? block ??? ???????????? ?????? ??????
        sessionStorage.setItem("newBlock", action.block.id);
        if (action.block.type === "page") {
          // ???????????? ????????? type ??? page ??? ??????
          const newPage: Page = {
            ...pageSample,
            id: action.block.id,
            parentsId: [targetPage.id],
          };
          addPage(newPage);
          if (action.block.parentBlocksId !== null) {
            const parentPage = findPage(
              pagesId,
              pages,
              action.block.parentBlocksId[0]
            ) as Page;
            const editedParentPage: Page = {
              ...parentPage,
              blocks:
                parentPage.blocks === null
                  ? [action.block]
                  : parentPage.blocks.concat(action.block),
              blocksId:
                parentPage.blocksId === null
                  ? [action.block.id]
                  : parentPage.blocksId?.concat(action.block.id),
              firstBlocksId:
                parentPage.firstBlocksId !== null
                  ? parentPage.firstBlocksId?.concat(action.block.id)
                  : [action.block.id],
              subPagesId:
                parentPage.subPagesId == null
                  ? [...blockSample.id]
                  : parentPage.subPagesId.concat([blockSample.id]),
              editTime: editTime,
            };
            editPage(editedParentPage);
          }
        }
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };
      case EDIT_BLOCK:
        editBlockData(blockIndex, action.block);
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };
      case CHANGE_BLOCK_TO_PAGE:
        const changedTypeBlock: Block = {
          ...action.block,
          contents:
            action.block.contents === "" ? "untitle" : action.block.contents,
          type: "page",
          subBlocksId: null,
          editTime: editTime,
        };
        editBlockData(blockIndex, changedTypeBlock);
        let newBlocksId = [blockSample.id];
        let newBlocks = [blockSample];
        let newFirstBlocksId = [blockSample.id];
        let newSubPagesId: string[] | null = null;
        const allSubBlocks = targetPage.blocks?.filter((block: Block) =>
          block.parentBlocksId?.includes(action.block.id)
        );
        if (allSubBlocks !== undefined && allSubBlocks[0] !== undefined) {
          newBlocks = allSubBlocks.map((block: Block) => {
            const newParentBlocksId =
              block.parentBlocksId !== null
                ? block.parentBlocksId.slice(1)
                : null;
            const newBlock: Block = {
              ...block,
              parentBlocksId:
                newParentBlocksId !== null
                  ? newParentBlocksId[0] === undefined
                    ? null
                    : newParentBlocksId
                  : null,
              firstBlock:
                newParentBlocksId == null || newParentBlocksId[0] === undefined,
            };
            return newBlock;
          });
          newBlocksId = newBlocks.map((block: Block) => block.id);
          newFirstBlocksId = newBlocks
            .filter((block: Block) => block.firstBlock === true)
            .map((block: Block) => block.id);
          newSubPagesId = newBlocks
            .filter((block: Block) => block.type === "page")
            .map((block: Block) => block.id);
          if (newBlocks[0] !== undefined) {
            targetPage.blocks =
              targetPage.blocks !== null
                ? targetPage.blocks.filter(
                    (block: Block) => !newBlocksId.includes(block.id)
                  )
                : null;
            targetPage.blocksId =
              targetPage.blocksId !== null
                ? targetPage.blocksId.filter(
                    (id: string) => !newBlocksId.includes(id)
                  )
                : null;
          }
          if (
            newSubPagesId[0] !== undefined &&
            targetPage.subPagesId !== null
          ) {
            targetPage.subPagesId = targetPage.subPagesId.filter(
              (id: string) => !newSubPagesId?.includes(id)
            );
          }
        }

        const title = changedTypeBlock.contents.includes("<span")
          ? getBlockText(action.block)
          : changedTypeBlock.contents;
        const newPage: Page = {
          id: changedTypeBlock.id,
          type: page,
          header: {
            title: title,
            iconType: changedTypeBlock.iconType,
            icon: changedTypeBlock.icon,
            cover: null,
            comments: changedTypeBlock.comments,
          },
          firstBlocksId: newFirstBlocksId,
          blocksId: newBlocksId,
          blocks: newBlocks,
          subPagesId:
            newSubPagesId == null
              ? null
              : newSubPagesId[0] === undefined
              ? null
              : newSubPagesId,
          parentsId: [action.pageId],
          editTime: changedTypeBlock.editTime,
          createTime: changedTypeBlock.createTime,
        };
        addPage(newPage);
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };
      case CHANGE_PAGE_TO_BLOCK:
        const changedTargetPageIndex = pagesId.indexOf(action.block.id);
        const changedTargetPage = pages[changedTargetPageIndex];
        deleteTargetPageData(
          pagesId,
          pages,
          firstPagesId,
          changedTargetPage,
          changedTargetPageIndex,
          false
        );
        const changedBlock: Block = {
          ...action.block,
          subBlocksId: changedTargetPage.blocksId,
          editTime: editTime,
        };
        editBlockData(blockIndex, changedBlock);
        if (
          changedTargetPage.blocks !== null &&
          changedTargetPage.blocksId !== null &&
          targetPage.blocks !== null &&
          targetPage.blocksId !== null
        ) {
          // targetPage??? changedTargetPage??? block?????? ??????
          const newParentBlocksId =
            action.block.parentBlocksId !== null
              ? action.block.parentBlocksId.concat(action.block.id)
              : [action.block.id];
          const newSubBlocks: Block[] = changedTargetPage.blocks.map(
            (block: Block) => ({
              ...block,
              firstBlock: false,
              parentBlocksId:
                block.parentBlocksId !== null
                  ? newParentBlocksId.concat(action.block.id)
                  : newParentBlocksId,
            })
          );
          const newTargetPageBlocks = targetPage.blocks.concat(newSubBlocks);
          const newTargetPlageBlocksId = targetPage.blocksId.concat(
            changedTargetPage.blocksId
          );
          const editedTargetPage: Page = {
            ...targetPage,
            blocks: newTargetPageBlocks,
            blocksId: newTargetPlageBlocksId,
            editTime: editTime,
          };
          editPage(editedTargetPage);
        }
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };
      case CHANGE_TO_SUB_BLOCK:
        //1. change  action.block's new parentBlock
        const { BLOCK, index } = findBlock(targetPage, action.newParentBlockId);
        const parentBlock: Block = {
          ...BLOCK,
          subBlocksId:
            BLOCK.subBlocksId !== null
              ? BLOCK.subBlocksId.concat(action.block.id)
              : [action.block.id],
          editTime: editTime,
        };
        const parentBlockIndex = index;
        editBlockData(parentBlockIndex, parentBlock);

        //2. change actoin.block to subBlopck : edit parentsId of action.block
        const editedBlock: Block = {
          ...action.block,
          firstBlock: false,
          parentBlocksId:
            parentBlock.parentBlocksId !== null
              ? parentBlock.parentBlocksId.concat(parentBlock.id)
              : [parentBlock.id],
          editTime: editTime,
        };
        editBlockData(blockIndex, editedBlock);
        // 3. first-> sub ??? ??????
        if (action.block.firstBlock) {
          // delte  id from firstBlocksId
          const index: number = targetPage.firstBlocksId?.indexOf(
            action.block.id
          ) as number;
          targetPage.firstBlocksId?.splice(index, 1);
        }
        // 4. action.block??? subBlock ?????? ?????? subBlock ?????? ??????????????? ??????
        if (action.block.parentBlocksId !== null) {
          const previouseParentBlockId =
            action.block.parentBlocksId[action.block.parentBlocksId.length - 1];
          const { BLOCK, index } = findBlock(
            targetPage,
            previouseParentBlockId
          );
          const edtitedPreviousParentBlock: Block = {
            ...BLOCK,
            subBlocksId:
              BLOCK.subBlocksId !== null
                ? BLOCK.subBlocksId.filter(
                    (id: string) => id !== action.block.id
                  )
                : null,
            editTime: editTime,
          };
          editBlockData(index, edtitedPreviousParentBlock);
        }
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };

      case RAISE_BLOCK:
        /*  cursor.anchorOffset== 0 ?????? backspace ??? ????????? ???. targetPage??? fistBlocksId ??? ????????? ????????? ?????? 
          result1 combine: previsouBlockInDoc ??? content ?????? 
            case1. actionblock ??? firstBlock ??? ??????, 
            case2.  block ??? sub ?????? ?????? ?????? subBlock??? ?????? ??????
  
          result2.pull: action block ??? subBlock ????????? ????????? 
          */
        if (
          targetPage.firstBlocksId !== null &&
          targetPage.firstBlocksId[0] !== action.block.id &&
          targetPage.blocks !== null &&
          targetPage.blocksId !== null
        ) {
          const targetBlock = action.block;
          const { previousBlockInDoc, previousBlockInDocIndex } =
            findPreviousBlockInDoc(targetPage, action.block);
          /**
           * raiseBlock ???  previousBlock??? ????????? block??? ????????? ????????? ??????
           * @param parentBlock : previoustBlock??? parentBlock??? ????????? ?????? param
           * @param parentBlockIndex :previoustBlock??? parentBlock??? ????????? ?????? param
           */
          const combineContents = (
            parentBlock: Block | null,
            parentBlockIndex: number | null
          ) => {
            const editedPreBlockInDoc: Block = {
              ...previousBlockInDoc,
              contents: `${previousBlockInDoc.contents}${targetBlock.contents}`,
              editTime: editTime,
            };

            if (
              parentBlockIndex !== null &&
              parentBlock !== null &&
              parentBlock.subBlocksId !== null
            ) {
              const newSubBlocksId = parentBlock.subBlocksId.filter(
                (id: string) => id !== targetBlock.id
              );

              const newParentBlock: Block = {
                ...parentBlock,
                subBlocksId:
                  newSubBlocksId[0] === undefined ? null : newSubBlocksId,
                editTime: editTime,
              };
              if (parentBlock.id === previousBlockInDoc.id) {
                const newParentBlockAlsoPreviousBlock: Block = {
                  ...newParentBlock,
                  contents: editedPreBlockInDoc.contents,
                };
                editBlockData(
                  parentBlockIndex,
                  newParentBlockAlsoPreviousBlock
                );
              } else {
                editBlockData(previousBlockInDocIndex, editedPreBlockInDoc);
                editBlockData(parentBlockIndex, newParentBlock);
              }
            } else {
              editBlockData(previousBlockInDocIndex, editedPreBlockInDoc);
            }
            targetPage.blocks?.splice(blockIndex, 1);
            targetPage.blocksId?.splice(blockIndex, 1);

            raiseSubBlock(targetPage, action.block, true);
            updateNewParentAndFirstBlocksIdAfterRaise(targetPage, action.block);
            //firstBlocksId??? ??????
          };
          /**
           * rasieBlock ???, block??? ????????? ?????????(sub->parent)??????
           * @param subBlocksId : block??? parentBlock.subBlocksId
           * @param targetBlockIndexInSubBlocks : block??? subBlocksId ????????? index
           * @param parentBlock: block??? parentBlock
           * @param parentBlockIndex: block??? parentBlock???  page.blocks????????? index
           */
          const pullBlock = (
            subBlocksId: string[],
            targetBlockIndexInSubBlocks: number,
            parentBlock: Block,
            parentBlockIndex: number
          ) => {
            raiseSubBlock(targetPage, action.block, false);
            const editedTargetBlock: Block = {
              ...targetBlock,
              parentBlocksId: parentBlock.parentBlocksId,
              firstBlock: parentBlock.firstBlock,
              editTime: editTime,
            };
            editBlockData(blockIndex, editedTargetBlock);
            subBlocksId.splice(targetBlockIndexInSubBlocks, 1);
            const editedParentBlock: Block = {
              ...parentBlock,
              subBlocksId: subBlocksId[0] === undefined ? null : subBlocksId,
              editTime: editTime,
            };
            editBlockData(parentBlockIndex, editedParentBlock);
            //edit fristBlock
            if (parentBlock.firstBlock && targetPage.firstBlocksId !== null) {
              const firstIndex = targetPage.firstBlocksId.indexOf(
                parentBlock.id
              );
              targetPage.firstBlocksId.splice(
                firstIndex + 1,
                0,
                targetBlock.id
              );
            }

            if (parentBlock.parentBlocksId !== null) {
              const grandParentBlockId =
                parentBlock.parentBlocksId[
                  parentBlock.parentBlocksId.length - 1
                ];
              const { BLOCK, index } = findBlock(
                targetPage,
                grandParentBlockId
              );
              const grandParentBlock = BLOCK;
              const grandParentBlockIndex = index;
              if (grandParentBlock.subBlocksId !== null) {
                const grandSubsId = [...grandParentBlock.subBlocksId];
                const subIndex = grandSubsId.indexOf(parentBlock.id);
                grandSubsId.splice(subIndex + 1, 0, targetBlock.id);
                const newGrandParentBlock: Block = {
                  ...grandParentBlock,
                  subBlocksId: grandSubsId,
                  editTime: editTime,
                };
                editBlockData(grandParentBlockIndex, newGrandParentBlock);
              }
            }
          };
          //
          if (targetBlock.firstBlock) {
            //combine -case1
            combineContents(null, null);
          } else {
            const { parentBlock, parentBlockIndex } = findParentBlock(
              targetPage,
              targetBlock
            );
            if (parentBlock.subBlocksId !== null) {
              /**
               * paretBlock.subBlocksId??? ????????? ???
               */
              const subBlocksId = [...parentBlock.subBlocksId];
              const targetBlockIndexInSubBlocks = subBlocksId.indexOf(
                targetBlock.id
              );

              if (targetBlockIndexInSubBlocks < subBlocksId.length - 1) {
                //combine -case2
                combineContents(parentBlock, parentBlockIndex);
              } else {
                //pull
                pullBlock(
                  subBlocksId,
                  targetBlockIndexInSubBlocks,
                  parentBlock,
                  parentBlockIndex
                );
              }
            }
          }
        }
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };

      case DELETE_BLOCK:
        if (
          action.block.parentBlocksId !== null &&
          targetPage.blocks !== null &&
          targetPage.blocksId !== null
        ) {
          const parentBlocksId = action.block?.parentBlocksId as string[];
          const parentBlockId: string =
            parentBlocksId[parentBlocksId.length - 1];
          const parentBlockIndex = targetPage.blocksId.indexOf(parentBlockId);
          const parentBlock = targetPage.blocks[parentBlockIndex];
          const newSubBlocksId = parentBlock.subBlocksId?.filter(
            (id: string) => id !== action.block.id
          ) as string[];
          if (newSubBlocksId[0] !== undefined) {
            editBlockData(parentBlockIndex, {
              ...parentBlock,
              subBlocksId: newSubBlocksId,
            });
          } else {
            if (action.block.type.includes("List")) {
              deleteBlockData(targetPage, parentBlock);
            } else {
              editBlockData(parentBlockIndex, {
                ...parentBlock,
                subBlocksId: null,
              });
            }
          }
        }
        // ?????? ????????? block ??? subBlock??? ????????? ?????? ....
        if (action.isInMenu) {
          deleteBlockData(targetPage, action.block);
        } else {
          raiseSubBlock(targetPage, action.block, true);

          editFirstBlocksId(targetPage, action.block);
          targetPage.blocks?.splice(blockIndex, 1);
          targetPage.blocksId?.splice(blockIndex, 1);
        }
        if (action.block.type === "page") {
          deletePage(action.block.id, false);
        }
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };

      case DUPLICATE_PAGE:
        const targetPageIndex = pagesId.indexOf(targetPage.id);
        const nextPageId = pagesId[targetPageIndex + 1];
        const nextPage: Page = findPage(pagesId, pages, nextPageId);
        let number: string = "1";
        let stop: boolean = false;
        if (nextPage.header.title === `${targetPage.header.title}(1)`) {
          const slicedPages = pages.slice(targetPageIndex + 1);
          for (let i = 0; i < slicedPages.length && !stop; i++) {
            const title = slicedPages[i].header.title;
            if (title === `${targetPage.header.title}(${i + 1})`) {
              number = (i + 2).toString();
            } else {
              stop = true;
            }
          }
        }
        const duplicatedNewPage: Page = {
          ...targetPage,
          id: `${targetPage.id}_duplicate_${number}`,
          header: {
            ...targetPage.header,
            title: `${targetPage.header.title}(${number})`,
          },
          editTime: editTime,
        };
        if (targetPage.parentsId == null) {
          const index = firstPagesId.indexOf(targetPage.id);
          firstPagesId.splice(index + 1, 0, duplicatedNewPage.id);
        } else {
          const parentPage = {
            ...findPage(
              pagesId,
              pages,
              targetPage.parentsId[targetPage.parentsId.length - 1]
            ),
          };
          const parentPageIndex = pagesId.indexOf(parentPage.id);
          const subPageIndex = parentPage.subPagesId?.indexOf(
            targetPage.id
          ) as number;
          parentPage.subPagesId?.splice(subPageIndex, 0, duplicatedNewPage.id);

          pages.splice(parentPageIndex, 0, parentPage);
        }
        pages.splice(targetPageIndex + 1, 0, duplicatedNewPage);
        pagesId.splice(targetPageIndex + 1, 0, duplicatedNewPage.id);
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };

      case EDIT_PAGE:
        function editPage(newPage: Page) {
          if (pagesId !== null && pages !== null) {
            const parentsId = newPage.parentsId;
            if (parentsId !== null) {
              const parentPageId = parentsId[parentsId.length - 1];
              const parentPage = findPage(pagesId, pages, parentPageId);
              if (parentPage.blocks !== null && parentPage.blocksId !== null) {
                const blockIndex = parentPage.blocksId.indexOf(newPage.id);
                const pageBlock = parentPage.blocks[blockIndex];
                const editedPageBlock: Block = {
                  ...pageBlock,
                  contents: newPage.header.title,
                  icon: newPage.header.icon,
                  editTime: editTime,
                };
                parentPage.blocks.splice(blockIndex, 1, editedPageBlock);
              }
            }
            const pageIndex = pagesId.indexOf(newPage.id);
            pages.splice(pageIndex, 1, newPage);
          }
        }
        editPage(action.newPage);

        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };
      case MOVE_PAGE_TO_PAGE:
        /**
         * ????????? ????????? page
         */
        const moveTargetPage = findPage(pagesId, pages, action.pageId);
        const moveTargetPageIndex = pagesId.indexOf(action.pageId);
        const destinationPageId = action.destinationPageId;
        /**
         * ????????? ???????????? page
         */
        const destinationPage = findPage(pagesId, pages, destinationPageId);
        const destinationPageIndex = pagesId.indexOf(destinationPage.id);
        // editedMoveTargetpage : ???????????? ?????? ???????????? ????????? moveTargetPage
        const editedMoveTargetPage: Page = {
          ...moveTargetPage,
          parentsId: [destinationPageId],
          editTime: editTime,
        };
        pages.splice(moveTargetPageIndex, 1, editedMoveTargetPage);
        // notion??? firstPagesId ??????
        if (firstPagesId.includes(editedMoveTargetPage.id)) {
          const index = firstPagesId.indexOf(editedMoveTargetPage.id);
          firstPagesId.splice(index, 1);
        }
        // targetPage??? subPage??? parentsId ??????
        /**
         * ???????????? ?????? ???????????? subPage??? ???????????? ?????? ??????page??? ?????? subPage?????? parentsId??? ???????????? ??????
         * @param pageId subPage??? id
         */
        const changeParentsId = (pageId: string) => {
          const subPage = findPage(pagesId, pages, pageId) as Page;
          const subPageIndex = pagesId.indexOf(pageId);
          if (subPage.parentsId !== null) {
            const targetPageIndex = subPage.parentsId.indexOf(action.pageId);
            const remainPagesId = subPage.parentsId.slice(targetPageIndex);
            const newParentPagesId = [destinationPageId, ...remainPagesId];
            const editedSubPage: Page = {
              ...subPage,
              parentsId: newParentPagesId,
              editTime: editTime,
            };
            pages.splice(subPageIndex, 1, editedSubPage);
            if (subPage.subPagesId !== null) {
              subPage.subPagesId.forEach((subPageId: string) =>
                changeParentsId(subPageId)
              );
            }
          }
        };
        if (editedMoveTargetPage.subPagesId !== null) {
          editedMoveTargetPage.subPagesId.forEach((subPageId: string) =>
            changeParentsId(subPageId)
          );
        }
        let pageBlockStyle: BlockStyle = basicBlockStyle;

        // ????????? ?????????, targetPage??? ?????? ?????? page?????? targetPage??? ?????? ????????? ?????? :block ??????, subPages ??????
        if (moveTargetPage.parentsId !== null) {
          /**
           * ?????? ?????? targetPage??? ???????????? page
           */
          const parentPage = findPage(
            pagesId,
            pages,
            moveTargetPage.parentsId[moveTargetPage.parentsId.length - 1]
          );
          if (
            parentPage.blocks !== null &&
            parentPage.blocksId !== null &&
            parentPage.firstBlocksId !== null &&
            parentPage.subPagesId !== null
          ) {
            const blockIndex = parentPage.blocksId.indexOf(action.pageId);
            const pageBlock = parentPage.blocks[blockIndex];
            const firstBlocksId = [...parentPage.firstBlocksId];
            const subPagesId = [...parentPage.subPagesId];
            //parentPage??? firstBlock ??????
            if (pageBlock.firstBlock) {
              const indexAsFirst = firstBlocksId.indexOf(pageBlock.id);
              parentPage.firstBlocksId.splice(indexAsFirst, 1);
              //firstBlocksId.splice(indexAsFirst,1);
            }
            //pageBlock??? parentBlock??? ??????
            if (pageBlock.parentBlocksId !== null) {
              const { parentBlock, parentBlockIndex } = findParentBlock(
                parentPage,
                pageBlock
              );
              const subIndex = parentBlock.subBlocksId?.indexOf(
                pageBlock.id
              ) as number;
              const subBlocksId = [...(parentBlock.subBlocksId as string[])];
              subBlocksId.splice(subIndex, 1);
              const editedParentBlock: Block = {
                ...parentBlock,
                subBlocksId: subBlocksId,
                editTime: editTime,
              };
              parentPage.blocks.splice(parentBlockIndex, 1, editedParentBlock);
            }
            //parentPage?????? pageBlock ?????? , subPagesId?????? moveTargetPage ??????
            parentPage.blocks.splice(blockIndex, 1);
            parentPage.blocksId.splice(blockIndex, 1);
            const subPageIndex = subPagesId.indexOf(moveTargetPage.id);
            parentPage.subPagesId.splice(subPageIndex, 1);
            pageBlockStyle = pageBlock.style;
          }
        }

        //destination page ?????? ??????
        /**
         * ?????? page(destiantion page)??? ?????? ??? , targetPage???  ??? ???????????? page type block?????? ??????????????? ?????? ???????????? block
         */
        const newPageBlock: Block = {
          id: editedMoveTargetPage.id,
          contents: editedMoveTargetPage.header.title,

          firstBlock: true,
          subBlocksId: null,
          parentBlocksId: null,
          type: "page",
          iconType: editedMoveTargetPage.header.iconType,
          icon: editedMoveTargetPage.header.icon,
          editTime: editedMoveTargetPage.editTime,
          createTime: editedMoveTargetPage.createTime,
          style: pageBlockStyle,
          comments: editedMoveTargetPage.header.comments,
        };
        /**
         * page??? ???????????? ?????? ???????????? ????????? destinationPage
         */
        const editedDestinationPage: Page = {
          ...destinationPage,
          editTime: editTime,
          firstBlocksId:
            destinationPage.firstBlocksId !== null
              ? destinationPage.firstBlocksId.concat(newPageBlock.id)
              : [newPageBlock.id],
          blocks:
            destinationPage.blocks !== null
              ? destinationPage.blocks.concat(newPageBlock)
              : [newPageBlock],
          blocksId:
            destinationPage.blocksId !== null
              ? destinationPage.blocksId.concat(newPageBlock.id)
              : [newPageBlock.id],
          subPagesId:
            destinationPage.subPagesId !== null
              ? destinationPage.subPagesId.concat(editedMoveTargetPage.id)
              : [editedMoveTargetPage.id],
        };
        pages.splice(destinationPageIndex, 1, editedDestinationPage);
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };
      case DELETE_PAGE:
        function deleteTargetPageData(
          pagesId: string[],
          pages: Page[],
          firstPagesId: string[],
          deletedTargetPage: Page,
          deletedTargetPageIndex: number,
          blockDelete: boolean
        ) {
          if (deletedTargetPage.parentsId !== null) {
            const parentPageIndex = pagesId.indexOf(
              deletedTargetPage.parentsId[
                deletedTargetPage.parentsId.length - 1
              ]
            );
            const parentPage = pages[parentPageIndex];
            if (parentPage.subPagesId !== null) {
              const subPageIndex = parentPage.subPagesId.indexOf(
                deletedTargetPage.id
              );
              parentPage.subPagesId.splice(subPageIndex, 1);
              if (
                blockDelete &&
                parentPage.blocksId !== null &&
                parentPage.blocks !== null
              ) {
                const blockIndex = parentPage.blocksId.indexOf(
                  deletedTargetPage.id
                );
                const pageBlock = parentPage.blocks[blockIndex];
                parentPage.blocks.splice(blockIndex, 1);
                parentPage.blocksId.splice(blockIndex, 1);
                const firstBlocKIndex = parentPage.firstBlocksId?.indexOf(
                  pageBlock.id
                );
                if (firstBlocKIndex !== undefined) {
                  if (firstBlocKIndex > -1) {
                    parentPage.firstBlocksId?.splice(firstBlocKIndex, 1);
                  } else {
                    const { parentBlock, parentBlockIndex } = findParentBlock(
                      parentPage,
                      pageBlock
                    );
                    const newParentBlock: Block = {
                      ...parentBlock,
                      subBlocksId:
                        parentBlock.subBlocksId == null
                          ? null
                          : parentBlock.subBlocksId.filter(
                              (id: string) => id !== pageBlock.id
                            ),
                      editTime: editTime,
                    };
                    parentPage.blocks.splice(
                      parentBlockIndex,
                      1,
                      newParentBlock
                    );
                  }
                }
              }
            }
          } else {
            //firstPage ??? ??????
            const index = firstPagesId.indexOf(deletedTargetPage.id);
            firstPagesId.splice(index, 1);
          }
          pages.splice(deletedTargetPageIndex, 1);
          pagesId.splice(deletedTargetPageIndex, 1);
        }

        function deletePage(pageId: string, blockDelete: boolean) {
          if (pagesId !== null && pages !== null && firstPagesId !== null) {
            const deletedTargetPageIndex = pagesId.indexOf(pageId);
            const deletedTargetPage = pages[deletedTargetPageIndex];

            deleteTargetPageData(
              pagesId,
              pages,
              firstPagesId,
              deletedTargetPage,
              deletedTargetPageIndex,
              blockDelete
            );
            let trashTargetPage: TrashPage = {
              ...deletedTargetPage,
              subPages: null,
            };
            if (deletedTargetPage.subPagesId !== null) {
              const subPages: Page[] = deletedTargetPage.subPagesId.map(
                (id: string) => findPage(pagesId, pages, id)
              );
              trashTargetPage = {
                ...deletedTargetPage,
                subPages: subPages,
              };
              deletedTargetPage.subPagesId.forEach((id: string) => {
                const index = pagesId.indexOf(id);
                pages.splice(index, 1);
                pagesId.splice(index, 1);
              });
            }
            trash = {
              pagesId:
                trash.pagesId == null
                  ? [deletedTargetPage.id]
                  : trash.pagesId.concat(deletedTargetPage.id),
              pages:
                trash.pages == null
                  ? [trashTargetPage]
                  : trash.pages.concat(trashTargetPage),
            };
          }
        }
        deletePage(action.pageId, true);
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };
      case CANCLE_EDIT_TEMPLATE:
        const restorePage = (item: string) => {
          const sessionItem = sessionStorage.getItem(item);
          if (sessionItem !== null) {
            const originTemplate: Page = JSON.parse(sessionItem);
            const templateIndexInPages = pagesId.indexOf(originTemplate.id);
            pages.splice(templateIndexInPages, 1, originTemplate);
            sessionStorage.removeItem(item);
          }
        };
        restorePage("originTemplate");
        restorePage("originMoveTargetPage");
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId: templatesId,
          pagesId: pagesId,
          trash: trash,
        };
      case DELETE_TEMPLATE:
        const templateIndexInPages = pagesId.indexOf(`${action.pageId}`);
        pages.splice(templateIndexInPages, 1);
        pagesId.splice(templateIndexInPages, 1);
        if (templatesId !== null) {
          const templageIndexInTemplates = templatesId.indexOf(
            `${action.pageId}`
          );
          templatesId.splice(templageIndexInTemplates, 1);
        }
        return {
          pages: pages,
          firstPagesId: firstPagesId,
          templatesId:
            templatesId !== null
              ? templatesId[0] === undefined
                ? null
                : templatesId
              : templatesId,
          pagesId: pagesId,
          trash: trash,
        };
    }
  }
  switch (action.type) {
    case ADD_PAGE:
      let PAGES = pages !== null ? [...pages] : null;
      let PAGESID = pagesId !== null ? [...pagesId] : null;
      let FIRSTPAGESID = firstPagesId !== null ? [...firstPagesId] : null;

      if (pagesId !== null && pages !== null && firstPagesId !== null) {
        addPage(action.newPage);
      } else {
        PAGES = [action.newPage];
        PAGESID = [action.newPage.id];
        FIRSTPAGESID = [action.newPage.id];
      }
      return {
        pages: pages !== null ? pages : PAGES,
        firstPagesId: firstPagesId !== null ? firstPagesId : FIRSTPAGESID,
        templatesId: templatesId,
        pagesId: pagesId !== null ? pagesId : PAGESID,
        trash: trash,
      };

    case RESTORE_PAGE:
      let trashPages = trash.pages == null ? null : [...trash.pages];
      let trashPagesId = trash.pagesId === null ? null : [...trash.pagesId];

      PAGES = pages !== null ? [...pages] : null;
      PAGESID = pagesId !== null ? [...pagesId] : null;
      FIRSTPAGESID = firstPagesId !== null ? [...firstPagesId] : null;

      const restoredPage: Page = {
        ...(targetPage as Page),
        editTime: editTime,
        parentsId: null,
      };

      if (PAGES !== null && PAGESID !== null && FIRSTPAGESID !== null) {
        PAGES?.push(restoredPage);
        PAGESID.push(restoredPage.id);
        FIRSTPAGESID.push(restoredPage.id);
      } else {
        PAGES = [restoredPage];
        PAGESID = [restoredPage.id];
        FIRSTPAGESID = [restoredPage.id];
      }

      if (trashPages !== null && trashPagesId !== null) {
        const trashTargetPage = findPage(
          trashPagesId,
          trashPages,
          action.pageId
        ) as TrashPage;
        const trashTargetPageIndex = trashPagesId.indexOf(trashTargetPage.id);
        trashPages.splice(trashTargetPageIndex, 1);
        trashPagesId.splice(trashTargetPageIndex, 1);
        if (trashTargetPage.subPages !== null) {
          trashTargetPage.subPages.forEach((sub: Page) => {
            PAGES?.push(sub);
            PAGESID?.push(sub.id);
          });
        }
      }
      const newNotion: Notion = {
        pages: PAGES,
        pagesId: PAGESID,
        firstPagesId: FIRSTPAGESID,
        templatesId: templatesId,
        trash:
          trashPages?.[0] !== undefined && trashPagesId?.[0] !== undefined
            ? {
                pages: trashPages,
                pagesId: trashPagesId,
              }
            : {
                pages: null,
                pagesId: null,
              },
      };
      return newNotion;
    case CLEAN_TRASH:
      trash.pages?.splice(pageIndex, 1);
      trash.pagesId?.splice(pageIndex, 1);
      const cleanedTrash = {
        pages: trash.pages?.[0] !== undefined ? trash.pages : null,
        pagesId: trash.pagesId?.[0] !== undefined ? trash.pagesId : null,
      };
      return {
        ...state,
        trash: cleanedTrash,
      };

    case ADD_TEMPLATE:
      const newTemplate = action.template;

      return {
        pages: pages !== null ? pages.concat(newTemplate) : [newTemplate],
        firstPagesId: firstPagesId,
        templatesId:
          templatesId !== null
            ? templatesId.concat(newTemplate.id)
            : [newTemplate.id],
        pagesId:
          pagesId !== null ? pagesId.concat(newTemplate.id) : [newTemplate.id],
        trash: trash,
      };

    default:
      return state;
  }
}
