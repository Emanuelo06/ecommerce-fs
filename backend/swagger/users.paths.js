/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user profile (own profile or admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Users can only view their own profile.
 *       Admins can view any user's profile.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Access denied - can only view own profile
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user profile (own profile or admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Users can only update their own profile.
 *       Admins can update any user's profile.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied - can only update own profile
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user account (own account or admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Users can only delete their own account.
 *       Admins can delete any user's account.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       403:
 *         description: Access denied - can only delete own account
 *       404:
 *         description: User not found
 */

