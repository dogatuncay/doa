
class CommentTree {
  constructor(id, children) {
    this.id = id;
    this.children = children;
  }

  depthFirstReduce(f) {
    return f(this.id, this.children.map((child) => child.depthFirstReduce(f)))
  }
}

export function buildCommentIndex(comments) {
  let roots = [];
  let indexTree = {};
  comments.forEach((comment) => {
    if(comment.parent_comment === null) {
      roots = [...roots, comment.id];
      indexTree[comment.id] = [];
    } else {
      if(!(comment.parent_comment in indexTree)) indexTree[comment.parent_comment] = [];
      indexTree[comment.parent_comment].push(comment.id);
      if(!(comment.id in indexTree)) indexTree[comment.id] = [];
    }
  })
  return {roots, indexTree}
}

export function buildCommentTreeFromIndex(commentIndex, indexToExtract) {
  const children = commentIndex[indexToExtract].map((id) => buildCommentTreeFromIndex(commentIndex, id))
  return new CommentTree(indexToExtract, children)
}

// FUNCTIONS TO WRITE

// buildCommentIndex([Comments]) -> CommentIndex
// buildCommentTreeFromIndex(CommentIndex, indexToExtract) -> Tree
// buildCommentIdTrees([Comment]) -> [Tree]

export function buildCommentIdTrees(comments) {
  const index = buildCommentIndex(comments);
  return index.roots.map((root) => buildCommentTreeFromIndex(index.indexTree, root));
}

// EXAMPLE COMMENT ID TREE

// // YOU SHOULD MAKE IT A CLASS
// // define depthFirstReduce on class

// {
//   value: 5,
//   children: [
//     {
//       value: 6,
//       children: []
//     },
//     ...
//   ]
// }

// COMMENT TREE RENDER

// const comments = useSelector(...);
// const commentIdTrees = buildCommentIdTrees(comments);
// return <>{commentIdTrees.flatMap((tree) => tree.depthFirstReduce((id, children) => <Comment commentId={id}>{children}</Comment>))}</>

// COMMENT RENDER

// const Comment = ({commentId, children}) => {
//   const comment = useSelector(...);
//   return (
//     <div class="comment">
//       // the content for the content
//       <div class="children">
//         {children}
//       </div>
//     </div>    
//   )
// }